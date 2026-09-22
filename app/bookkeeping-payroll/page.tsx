import { FocusServicePage, serviceMetadata } from "@/components/focus-service-page";

export const metadata = serviceMetadata("bookkeeping-payroll");

export default function Page() {
  return <FocusServicePage slug="bookkeeping-payroll" />;
}
