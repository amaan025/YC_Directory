import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        id?: string; // Sanity author _id (you assign token.id)
    }
}
