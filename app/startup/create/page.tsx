import { currentUser } from "@clerk/nextjs/server";
import StartupForm from "@/components/StartupForm";
import { redirect } from "next/navigation";

export default async function CreateStartupPage() {
  const user = await currentUser();
  if (!user) redirect("/");
  return (
    <>
      <section className="purple-container min-h-[230px] pattern">
        <h1 className="heading">SUBMIT YOUR NEW STARTUP</h1>
      </section>
      <StartupForm />
    </>
  );
}
