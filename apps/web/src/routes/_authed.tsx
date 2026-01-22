import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute, useLocation } from "@tanstack/react-router";

export const Route = createFileRoute("/_authed")({
	beforeLoad: ({ context }) => {
		if (!context.userId) {
			throw new Error("Not authenticated");
		}
	},
	errorComponent: ({ error }) => {
		const location = useLocation();

		if (error.message === "Not authenticated") {
			return (
				<div className="flex items-center justify-center p-12">
					<SignIn forceRedirectUrl={location.href} routing="hash" />
				</div>
			);
		}

		throw error;
	},
});
