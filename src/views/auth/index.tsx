"use client";

import { BASE_URL } from "@/config";
import { createClient } from "@/lib/supabase/client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function AuthView({
  type = "sign_in",
}: {
  type?: "sign_in" | "sign_up";
}) {
  const supabase = createClient();
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      providers={["google", "github"]}
      view={type}

      // redirectTo={`${BASE_URL}/auth/callback`}
    />
  );
}
