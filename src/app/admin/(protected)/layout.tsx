import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env";

export default async function AdminProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token")?.value;
  if (!adminToken || adminToken !== env.ADMIN_SECRET) {
    redirect("/admin/login");
  }
  return <>{children}
  
  </>;
}


