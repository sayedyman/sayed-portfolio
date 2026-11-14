"use client";

import { useEffect } from "react";

export function AuthRecoveryRedirect() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    if (params.get("type") !== "recovery" || !params.has("access_token")) return;

    window.location.replace(
      `${window.location.origin}/inquiries-admin/reset-password${window.location.hash}`,
    );
  }, []);

  return null;
}
