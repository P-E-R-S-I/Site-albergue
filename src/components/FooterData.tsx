import Footer from "@/components/Footer";
import { getInfoAlbergue } from "@/lib/supabase";

export default async function FooterData() {
  const info = await getInfoAlbergue();
  return <Footer info={info} />;
}
