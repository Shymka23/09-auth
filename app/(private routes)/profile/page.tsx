import { getServerMe } from "@/lib/api/serverApi";
import { ProfileClient } from "./ProfileClient";
import type { Metadata } from "next";

export default async function ProfilePage() {
  const user = await getServerMe();

  return <ProfileClient user={user} />;
}

export const metadata: Metadata = {
  title: "Profile Page",
  description: "User profile information",
};
