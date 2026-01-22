import { useAuth } from "@clerk/tanstack-react-start";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { useStoreUser } from "@/hooks/use-store-user";

export const Route = createFileRoute("/_protected")({
	component: ProtectedLayout,
});

function ProtectedLayout() {
	const { isLoaded, isSignedIn } = useAuth();
	const navigate = useNavigate();

	// Sync user to Convex on auth
	useStoreUser();

	useEffect(() => {
		if (isLoaded && !isSignedIn) {
			navigate({ to: "/sign-in" });
		}
	}, [isLoaded, isSignedIn, navigate]);

	if (!isLoaded) {
		return (
			<div className="flex min-h-screen items-center justify-center">
				<div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
			</div>
		);
	}

	if (!isSignedIn) {
		return null;
	}

	return <Outlet />;
}
