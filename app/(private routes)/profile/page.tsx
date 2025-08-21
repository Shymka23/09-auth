import { getServerMe } from "@/lib/api/serverApi";
import { ProfileClient } from "./ProfileClient";

export default async function ProfilePage() {
  const user = await getServerMe();

  return <ProfileClient user={user} />;
}
