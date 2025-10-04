"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import SedipNews from "../admin/SedipNews";
import SedipEvents from "../admin/SedipEvents";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        router.replace("/adminLogin");
      } else {
        setSession(session);
      }
      setLoading(false);
    };
    checkSession();
  }, [router]);

  if (loading || !session) return null;

  return (
    <div>
      <SedipNews />
      <SedipEvents />
    </div>
  );
}
