"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Loader2 } from "lucide-react";

const ADMIN_EMAILS = ["guitargiveawaychannel345@gmail.com"];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setIsAuthorized(false);
        router.push("/login");
      } else if (user.email && ADMIN_EMAILS.includes(user.email)) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isAuthorized === null) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isAuthorized === false) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg p-4 font-semibold flex items-center justify-between">
        <span>⚠️ GOD-MODE ADMIN ACTIVE</span>
        <span className="text-sm opacity-80">You are editing live production data.</span>
      </div>
      {children}
    </div>
  );
}
