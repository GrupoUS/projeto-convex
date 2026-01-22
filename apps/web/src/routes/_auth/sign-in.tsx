import { SignIn } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/sign-in")({
	component: SignInPage,
});

function SignInPage() {
	return (
		<SignIn
			forceRedirectUrl="/dashboard"
			path="/sign-in"
			routing="path"
			signUpUrl="/sign-up"
		/>
	);
}
