import { UserButton } from "@clerk/tanstack-react-start";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "@my-better-t-app/backend/convex/_generated/api";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/_authed/dashboard")({
	component: DashboardPage,
	loader: async ({ context }) => {
		await context.queryClient.ensureQueryData(
			convexQuery(api.users.getCurrentUser, {})
		);
	},
});

function DashboardPage() {
	const { data: user } = useSuspenseQuery(
		convexQuery(api.users.getCurrentUser, {})
	);

	return (
		<div className="container mx-auto space-y-6 px-4 py-6">
			<div className="flex items-center justify-between">
				<h1 className="font-bold text-3xl">Dashboard</h1>
				<UserButton />
			</div>

			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
				<Card>
					<CardHeader>
						<CardTitle>Welcome</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							Hello, {user?.name || user?.email || "User"}!
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Real-Time Updates</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							This dashboard updates automatically when your data changes in the
							database.
						</p>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Get Started</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-muted-foreground">
							Customize this boilerplate to build your SaaS product.
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
