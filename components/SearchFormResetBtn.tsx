"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { X } from "lucide-react";

export const SearchFormResetBtn = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
  };
  return (
    <Link href={"/"}>
      <Button type="reset" onClick={reset} className="search-btn">
        <X className="size-5" />
      </Button>
    </Link>
  );
};
