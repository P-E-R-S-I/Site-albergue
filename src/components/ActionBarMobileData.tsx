import ActionBarMobile from "@/components/ActionBarMobile";
import { getInfoAlbergue } from "@/lib/supabase";

export default async function ActionBarMobileData() {
  const info = await getInfoAlbergue();
  return <ActionBarMobile whatsapp={info.whatsapp} />;
}
