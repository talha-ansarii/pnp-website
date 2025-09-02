import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/env";

interface SearchParams {
  error?: string;
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  const error = (await searchParams)?.error;
  const cookieStore = cookies();
  const existing = (await cookieStore).get("admin_token")?.value;

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
    <div className="mx-auto flex h-[calc(100dvh-170px)] max-w-md items-center justify-center p-6">
      <div>
        <h1 className="mb-4 text-2xl font-semibold">Admin Login</h1>
        <form action={login} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm">Admin Secret</label>
            <input
              name="secret"
              type="password"
              className="w-full rounded border border-neutral-700 bg-black p-2"
              placeholder="Enter secret"
            />
          </div>
          <button
            type="submit"
            className="rounded bg-white px-4 py-2 text-black"
          >
            Login
          </button>
        </form>

        {error === "invalid" && (
          <p className="mt-4 text-sm text-red-400" role="alert">
            Incorrect secret. Please try again.
          </p>
        )}
      </div>
    </div>
  );
}
