import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
	path: "/clerk-webhook",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
		if (!webhookSecret) {
			console.error("CLERK_WEBHOOK_SECRET is not configured");
			return new Response("Webhook secret not configured", { status: 500 });
		}

		const svixId = request.headers.get("svix-id");
		const svixTimestamp = request.headers.get("svix-timestamp");
		const svixSignature = request.headers.get("svix-signature");

		const hasSvixHeaders = svixId && svixTimestamp && svixSignature;
		if (!hasSvixHeaders) {
			return new Response("Missing svix headers", { status: 400 });
		}

		const body = await request.text();

		const wh = new Webhook(webhookSecret);
		let evt: {
			type: string;
			data: {
				id: string;
				email_addresses?: Array<{ email_address: string }>;
				first_name?: string;
				last_name?: string;
				image_url?: string;
			};
		};

		try {
			evt = wh.verify(body, {
				"svix-id": svixId,
				"svix-timestamp": svixTimestamp,
				"svix-signature": svixSignature,
			}) as typeof evt;
		} catch (err) {
			console.error("Webhook verification failed:", err);
			return new Response("Invalid signature", { status: 400 });
		}

		const eventType = evt.type;

		if (eventType === "user.created" || eventType === "user.updated") {
			const { id, email_addresses, first_name, last_name, image_url } =
				evt.data;
			const email = email_addresses?.[0]?.email_address;
			const name =
				[first_name, last_name].filter(Boolean).join(" ") || undefined;

			if (email) {
				await ctx.runMutation(api.users.upsertUserFromWebhook, {
					clerkId: id,
					email,
					name,
					imageUrl: image_url,
				});
			}
		}

		if (eventType === "user.deleted") {
			await ctx.runMutation(api.users.deleteByClerkId, {
				clerkId: evt.data.id,
			});
		}

		return new Response("OK", { status: 200 });
	}),
});

export default http;
