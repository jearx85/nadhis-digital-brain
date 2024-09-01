"use client";

import React, { useEffect, useState } from "react";
import { signIn, signUp } from "./actions";
import { Modal } from "../_components/modalLogin";
import WrongCredential from "./messages/WrongCredential";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function LoginComponent() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const message = searchParams.get("message");
    if (message === "Invalid login credentials") {
      setLoginModalOpen(true);
    }
  }, [searchParams]);

  const handleClose = () => {
    setLoginModalOpen(false);
    router.push("/");
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 bg-white dark:bg-[#121212] my-5 mt-10">
      <form
        method="post"
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground dark:bg-[#121212] p-2"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button
          type="submit"
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          formAction={signIn}
        >
          Login
        </button>
        {/* <button
          formAction={signUp}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
        >
          Sign Up
        </button> */}
        <span className="self-container">
          No tienes cuenta aún?{" "}
          <Link href="/signup" className="text-primary-600">
            Registrate
          </Link>
        </span>
      </form>

      <Modal isOpen={isLoginModalOpen} onClose={handleClose}>
        <WrongCredential />
      </Modal>
    </div>
  );
}
