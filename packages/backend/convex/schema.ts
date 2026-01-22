import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		// Clerk user ID
		clerkId: v.string(),
		// User info synced from Clerk
		email: v.string(),
		name: v.optional(v.string()),
		imageUrl: v.optional(v.string()),
		// Timestamps
		createdAt: v.number(),
		updatedAt: v.number(),
	})
		.index("by_clerk_id", ["clerkId"])
		.index("by_email", ["email"]),
});

