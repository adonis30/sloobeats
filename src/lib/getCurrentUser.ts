"use server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions"


/**
 * Returns the currently logged-in user from the session.
 * @returns User object with id, email, name, role, or null if not logged in.
 */
export async function getCurrentUser(): Promise<{ id: string; email: string; name: string | null; role: string } | null> {
  const session = await getServerSession(authOptions);

  if (!session?.user) return null;

  // Ensure role is always set
  return {
    id: session.user.id,
    email: session.user.email!,
    name: session.user.name ?? null,
    role: session.user.role,
  };
}
