import AnnualList from "@/components/AnnualList";
import { getAnnualListOf } from "@/service/annual";

export default async function AnnualPage() {
  const now = new Date();
  const annualList = await getAnnualListOf(now.getFullYear().toString());
  return (
    <section className="w-full">
      <AnnualList annualList={annualList} />
    </section>
  );
}
