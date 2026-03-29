import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "联系我们 | Contact",
  description: "联系广西大学土壤生态课题组：刘华清 huaqingliu@gxu.edu.cn、杨佳慧 yangjiahui@gxu.edu.cn。Contact the Soil Ecology Lab at Guangxi University.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
