"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";

const SideBar = () => {
  return (
    <Menubar className="sm:hidden">
      <MenubarMenu>
        <MenubarTrigger>
          <Menu />
        </MenubarTrigger>
        <MenubarContent>
          <Link href={"/"}>
            <MenubarItem>Home</MenubarItem>
          </Link>
          <MenubarSeparator />
          <Link href={"/startup/create"}>
            <MenubarItem>
              <span>Create</span>
            </MenubarItem>{" "}
          </Link>
          <MenubarSeparator />
          <MenubarItem className="justify-self-end">
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
          </MenubarItem>
          <MenubarSeparator />
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default SideBar;
