import { v } from "convex/values";
import type { MutationCtx, QueryCtx } from "./_generated/server";
import { mutation, query } from "./_generated/server";

// Helper to get current user or throw
export async function getCurrentUserOrThrow(ctx: QueryCtx | MutationCtx) {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) {
		throw new Error("Unauthorized");
	}

	const user = await ctx.db
		.query("users")
		.withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
		.unique();

	if (!user) {
		throw new Error("User not found");
	}

	return user;
}

// Get current authenticated user
export const getCurrentUser = query({
	args: {},
	handler: async (ctx) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			return null;
		}

		return await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
			.unique();
	},
});

// Upsert user (called after Clerk sign-in/sign-up)
export const upsertUser = mutation({
	args: {
		email: v.string(),
		name: v.optional(v.string()),
		imageUrl: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) {
			throw new Error("Unauthorized");
		}

		const existingUser = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
			.unique();

		const now = Date.now();

		if (existingUser) {
			await ctx.db.patch(existingUser._id, {
				...args,
				updatedAt: now,
			});
			return existingUser._id;
		}

		return await ctx.db.insert("users", {
			clerkId: identity.subject,
			...args,
			createdAt: now,
			updatedAt: now,
		});
	},
});

// Update current user
export const updateCurrentUser = mutation({
	args: {
		name: v.optional(v.string()),
		imageUrl: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const user = await getCurrentUserOrThrow(ctx);

		await ctx.db.patch(user._id, {
			...args,
			updatedAt: Date.now(),
		});

		return user._id;
	},
});

// Delete user by Clerk ID (called by webhook on user.deleted)
export const deleteByClerkId = mutation({
	args: {
		clerkId: v.string(),
	},
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
			.unique();

		if (user) {
			await ctx.db.delete(user._id);
			return true;
		}

		return false;
	},
});

// Internal upsert for webhook (no auth required, uses clerkId directly)
export const upsertUserFromWebhook = mutation({
	args: {
		clerkId: v.string(),
		email: v.string(),
		name: v.optional(v.string()),
		imageUrl: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const existingUser = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
			.unique();

		const now = Date.now();

		if (existingUser) {
			await ctx.db.patch(existingUser._id, {
				email: args.email,
				name: args.name,
				imageUrl: args.imageUrl,
				updatedAt: now,
			});
			return existingUser._id;
		}

		return await ctx.db.insert("users", {
			clerkId: args.clerkId,
			email: args.email,
			name: args.name,
			imageUrl: args.imageUrl,
			createdAt: now,
			updatedAt: now,
		});
	},
});
