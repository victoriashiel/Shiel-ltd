import { FocusServicePage, serviceMetadata } from "@/components/focus-service-page";
import { InternationalScenariosGrid } from "@/components/international-scenarios";

export const metadata = serviceMetadata("international-accounting");

export default function Page() {
  return (
    <FocusServicePage
      slug="international-accounting"
      beforeCta={<InternationalScenariosGrid />}
    />
  );
}
