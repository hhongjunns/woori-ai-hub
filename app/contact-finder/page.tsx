import { getContactFinderSidebarInfo } from "@/lib/services/contact-finder";
import ContactFinderClient from "./components/ContactFinderClient";

export default async function ContactFinderPage() {
  const { frequentlyFoundOrgs, recentSearches } =
    await getContactFinderSidebarInfo();

  return (
    <ContactFinderClient
      frequentlyFoundOrgs={frequentlyFoundOrgs}
      recentSearches={recentSearches}
    />
  );
}
