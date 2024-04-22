"use client";

import { ChevronsLeftRight } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/clerk-react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";

export const UserLogin = () => {
  const { user } = useUser();

  return (
    <>
      <div className="flex items-center p-2 bg-slate-200 dark:bg-slate-500 mt-10 rounded-xl">
        <div className="rounded-md bg-secondary p-1">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.imageUrl} />
          </Avatar>
        </div>
        <div className="space-y-1">
          <p className="text-sm line-clamp-1">
            {user?.fullName}&apos;s Nadhis Digital Brain
          </p>
        </div>
      </div>
      <div className="mt-10 hover:text-cyan-500">
        <SignOutButton>Log out</SignOutButton>
      </div>
    </>
  );
};
