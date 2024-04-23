"use client";

import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import { Logo } from "./logo";
import { UserLogin } from "@/app/(main)/_components/user-login";

export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3">
          <div className="relative h-screen">
            <Image
              src="/smartCity.jpg"
              alt="Smart City"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 flex items-center justify-center px-20 bg-gray-900 bg-opacity-40">
              <div>
                <h2 className="text-8xl font-bold text-white">Smart City</h2>
                <h2 className="text-6xl font-bold text-white text-center mt-8">Medellin</h2>
                <p className="max-w-xl mt-8 text-gray-300">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                  autem ipsa, nulla laboriosam dolores, repellendus perferendis
                  libero suscipit nam temporibus molestiae
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex-1 text-center p-5 border rounded-2xl shadow-2xl dark:bg-gray-800">
                <div className="flex justify-between">
                  <Logo />
                  <ModeToggle />
                </div>

                <hr />
                {isLoading && (
                  <div className="w-full flex items-center justify-center mt-10">
                    <Spinner size="lg" />
                  </div>
                )}
                {isAuthenticated && !isLoading && (
                  <div className=" items-center flex justify-center">
                      <Link href="/dashboard" className="mr-2">
                        <UserLogin />
                      </Link>
                  </div>
                )}
                {!isAuthenticated && !isLoading && (
                  <SignInButton mode="modal">
                    <div className="items-center justify-center">
                      <p className="mt-10 text-gray-500 dark:text-gray-300">
                        Ingresa a tu cuenta
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-5 bg-slate-200 dark:bg-slate-500 mt-2"
                      >
                        Log in
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </SignInButton>
                )}
                <div className="mt-10">
                  <div className="text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                      Your Ideas, Documents, & Plans. Unified. Welcome to{" "}
                      <span className="underline">Nadhis Digital Brain</span>
                    </h2>
                    <h3 className="text-base sm:text-xl md:text-2xl font-medium mt-10">
                      Nadhis Digital Brain is the connected workspace where{" "}
                      <br />
                      better, faster work happens.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};