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
      <main className="grow pt-20 sm:pt-28 lg:pt-32">{children}</main>
      <Footer border={true} />
    </>
  );
}
