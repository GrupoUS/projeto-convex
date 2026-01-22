import { SignUp } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/sign-up")({
	component: SignUpPage,
});

function SignUpPage() {
	return (
		<SignUp
			forceRedirectUrl="/dashboard"
			path="/sign-up"
			routing="path"
			signInUrl="/sign-in"
		/>
	);
}
