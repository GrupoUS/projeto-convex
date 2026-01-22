import { convexQuery } from "@convex-dev/react-query";
import { api } from "@my-better-t-app/backend/convex/_generated/api";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
	return useQuery(convexQuery(api.users.getCurrentUser, {}));
}
