import type { Metadata } from "next";
import { PasswordResetForm } from "@/components/admin/PasswordResetForm";

export const metadata: Metadata = {
  title: "Set a New Password",
  robots: { index: false, follow: false },
};

export default function PasswordResetPage() {
  return <PasswordResetForm />;
}
