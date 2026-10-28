"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useAdminAuth() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me")
      .then((response) => {
        if (!active) return;
        if (response.status === 401) {
          router.replace("/admin/login");
          return;
        }
        setChecking(false);
      })
      .catch(() => {
        if (active) router.replace("/admin/login");
      });

    return () => {
      active = false;
    };
  }, [router]);

  return checking;
}
