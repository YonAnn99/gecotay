import Hero from "./components/home/Hero";
import Services from "./components/home/Services";
import AuroraBackground from "./components/ui/AuroraBackground";

export default function Home() {
  return (
    <>
      <AuroraBackground />
      <Hero />
      <main className="flex-1">
        <Services />
      </main>
    </>
  );
}