import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export default function useGetUser() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {

      const { data: { user } } = await supabase.auth.getUser()

      setUser(user);
    };

    getUser();
  }, [supabase.auth]);

  return user;
}
