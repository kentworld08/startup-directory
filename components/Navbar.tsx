import Image from "next/image";
import Link from "next/link";
// import { auth, signIn, signOut } from "../app/auth";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import SideBar from "./SideBar";

export const Navbar = async () => {
  // const session = await auth();
  const user = await currentUser();
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans fixed top-0 w-full left-0 right-0 z-10">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          {user ? (
            <span className="font-semibold text-base sm:font-bold sm:text-xl">
              Welcome,&nbsp;{user.firstName}
            </span>
          ) : (
            <Image
              src={"/logo.jpg"}
              alt="Logo"
              width={20}
              height={144}
              className="w-auto h-auto"
            />
          )}
        </Link>
        <div className=" hidden sm:flex sm:items-center sm:gap-8 ">
          <Link href={"/"}>Home</Link>
          <Link href={"/startup/create"}>
            <span>Create</span>
          </Link>

          <SignedOut>
            <SignInButton>
              <button
                type="button"
                className="border border-black rounded-4xl px-4 py-2.5 text-sm font-semibold flex items-center gap-2 cursor-pointer"
              >
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
        <SideBar />
      </nav>
    </header>
  );
};
