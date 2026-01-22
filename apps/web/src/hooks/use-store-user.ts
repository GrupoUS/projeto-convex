import { useUser } from "@clerk/tanstack-react-start";
import { api } from "@my-better-t-app/backend/convex/_generated/api";
import { useMutation } from "convex/react";
import { useEffect } from "react";

export function useStoreUser() {
	const { user, isLoaded } = useUser();
	const upsertUser = useMutation(api.users.upsertUser);

	useEffect(() => {
		if (!(isLoaded && user)) return;

		const email = user.primaryEmailAddress?.emailAddress;
		if (!email) return;

		upsertUser({
			email,
			name: user.fullName ?? undefined,
			imageUrl: user.imageUrl ?? undefined,
		}).catch((err) => {
			// Log error but don't crash - user sync is best effort
			console.error("Failed to sync user to Convex:", err);
		});
	}, [isLoaded, user, upsertUser]);
}
