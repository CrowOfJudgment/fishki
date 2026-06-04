import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="grow pt-24 sm:pt-28">{children}</main>
      <Footer border={true} />
    </>
  );
}
