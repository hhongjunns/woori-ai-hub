import { getRepositories, getTaskCards } from "@/lib/services/coding-automation";
import CodingAutomationClient from "./components/CodingAutomationClient";

export default async function CodingAutomationPage() {
  const [repositories, cards] = await Promise.all([
    getRepositories(),
    getTaskCards(),
  ]);

  return <CodingAutomationClient repositories={repositories} initialCards={cards} />;
}
