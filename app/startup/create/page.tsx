import { auth } from "@/app/auth";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";

export default async function CreateStartupPage() {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <>
      <section className="purple-container min-h-[230px] pattern">
        <h1 className="heading">SUBMIT YOUR NEW STARTUP</h1>
      </section>
      <StartupForm />
    </>
  );
}
