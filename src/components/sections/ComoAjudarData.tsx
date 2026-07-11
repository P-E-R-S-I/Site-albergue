import ComoAjudar from "@/components/sections/ComoAjudar";
import { getInfoAlbergue } from "@/lib/supabase";

export default async function ComoAjudarData() {
  const info = await getInfoAlbergue();
  return <ComoAjudar whatsapp={info.whatsapp} />;
}
