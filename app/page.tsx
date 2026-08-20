import Hero from "./components/home/Hero";
import Services from "./components/home/Services";
import Footer from "./components/layout/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <main className="flex-1">
        <Services />
      </main>
      <Footer />
    </>
  );
}