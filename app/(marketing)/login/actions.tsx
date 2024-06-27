"use server";

import { supabase } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export const signIn = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect(`/?message=${encodeURIComponent(error.message)}`);
  }

  return redirect("/dashboard");
};

export const signUp = async (formData: FormData) => {
  const origin = headers().get("origin");
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect(`/?message=${encodeURIComponent(error.message)}`);
  }

  return redirect("/login?message=Check email to continue sign in process");
};
