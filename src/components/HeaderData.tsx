import Header from "@/components/Header";
import { getInfoAlbergue } from "@/lib/supabase";

export default async function HeaderData() {
  const info = await getInfoAlbergue();
  return <Header whatsapp={info.whatsapp} />;
}
