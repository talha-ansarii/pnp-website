import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env";


export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: { error?: string };
}) {
  const cookieStore = await cookies();
  const existing = cookieStore.get("admin_token")?.value;
  if (existing && existing === env.ADMIN_SECRET) {
    redirect("/admin");
  }


  async function login(formData: FormData) {
    "use server";
    const raw = formData.get("secret");
    const secret = typeof raw === "string" ? raw.trim() : "";
    if (secret && secret === env.ADMIN_SECRET) {
      (await cookies()).set("admin_token", secret, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
      });
      redirect("/admin");
    } 
    redirect("/admin/login?error=invalid");
    
    
  }

  return (
    <div className="p-6 max-w-md mx-auto h-[calc(100dvh-170px)] flex justify-center items-center">
      <div className="">
      <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
      <form action={login} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Admin Secret</label>
          <input
            name="secret"
            type="password"
            className="w-full rounded border border-neutral-700 bg-black p-2"
            placeholder="Enter secret"
          />
        </div>
        <button type="submit" className="px-4 py-2 rounded bg-white text-black">Login</button>
      </form>

      {searchParams?.error === "invalid" && (
        <p className="mt-4 text-sm text-red-400" role="alert">Incorrect secret. Please try again.</p>
      )}

      </div>
    </div>
  );
}


