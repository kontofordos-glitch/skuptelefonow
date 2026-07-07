import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getSessionUser } from "@/lib/auth";

export const metadata = {
  title: "Logowanie admin | JablkoSkup.pl"
};

export default async function AdminLoginPage() {
  const user = await getSessionUser();
  if (user) redirect("/admin");

  return (
    <main className="grid min-h-svh place-items-center bg-secondary/35 p-4">
      <LoginForm />
    </main>
  );
}
