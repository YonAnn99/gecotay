import Hero from "./components/home/Hero";
import Services from "./components/home/Services";
import GrainientBackground from "./components/ui/GrainientBackground";

export default function Home() {
  return (
    <>
      <GrainientBackground />
      <Hero />
      <main className="flex-1">
        <Services />
      </main>
    </>
  );
}