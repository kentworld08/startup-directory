import Image from "next/image";
import Link from "next/link";
import { auth, signIn, signOut } from "../app/auth";

export const Navbar = async () => {
  const session = await auth();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans fixed top-0 w-full left-0 right-0 z-10">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image
            src={"/logo.jpg"}
            alt="Logo"
            width={20}
            height={144}
            className="w-auto h-auto"
          />
        </Link>
        <div className="flex items-center gap-5 ">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"}>
                <span>Create</span>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut<true>();
                }}
              >
                <button type="submit" className="cursor-pointer">
                  <span>Logout</span>
                </button>
              </form>
              <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <button type="submit" className="cursor-pointer">
                <span>Login</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};
