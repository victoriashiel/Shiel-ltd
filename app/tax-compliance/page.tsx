import { FocusServicePage, serviceMetadata } from "@/components/focus-service-page";

export const metadata = serviceMetadata("tax-compliance");

export default function Page() {
  return <FocusServicePage slug="tax-compliance" />;
}
