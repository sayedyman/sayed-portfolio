import type { Metadata } from "next";
import { InboxDashboard } from "@/components/admin/InboxDashboard";

export const metadata: Metadata = {
  title: "Contact Inbox",
  robots: { index: false, follow: false },
};

export default function InquiriesAdminPage() {
  return <InboxDashboard />;
}
