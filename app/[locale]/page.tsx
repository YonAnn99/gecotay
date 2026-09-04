import { Metadata } from "next";
import Hero from "../components/home/Hero";
import Services from "../components/home/Services";
import About from "../components/home/About";
import NewProducts from "../components/home/NewProducts";
import WhyChoose from "../components/home/WhyChoose";
import KeyTakeaways from "../components/ui/KeyTakeaways";
import { t } from "../lib/i18n";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const isEs = locale === "es";
  return {
    title: isEs
      ? "Grupo Gecotay | Fabricación y Venta de Mobiliario de Oficina en CDMX y Edomex"
      : "Grupo Gecotay | Office Furniture Manufacturing & Sales in Mexico City",
    description: isEs
      ? "Fabricamos y distribuimos mobiliario de oficina, sillería, recepciones, salas de juntas y almacenamiento. Garantía hasta 5 años. Envío gratis en CDMX y área metropolitana."
      : "We manufacture and distribute office furniture, seating, reception desks, boardroom tables and storage. Up to 5‑year warranty. Free shipping in Mexico City metro area.",
    openGraph: {
      title: isEs ? "Grupo Gecotay – Mobiliario de Oficina" : "Grupo Gecotay – Office Furniture",
      description: isEs
        ? "Diseño, fabricación e instalación de mobiliario para oficinas. Cotiza hoy."
        : "Design, manufacturing and installation of office furniture. Request a quote today.",
      locale,
    },
    alternates: {
      languages: {
        es: "/es",
        en: "/en",
      },
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale } = await params;
  const logisticsTakeaways = [
    { label: t(locale, "logistics.shippingLabel"), value: t(locale, "logistics.shippingValue") },
    { label: t(locale, "logistics.coverageLabel"), value: t(locale, "logistics.coverageValue") },
    { label: t(locale, "logistics.installationLabel"), value: t(locale, "logistics.installationValue") },
    { label: t(locale, "logistics.warrantyLabel"), value: t(locale, "logistics.warrantyValue") },
  ];
  return (
    <>
      <Hero locale={locale} />
      <main className="flex-1">
        <KeyTakeaways items={logisticsTakeaways} />
        <Services locale={locale} />
        <About locale={locale} />
        <NewProducts locale={locale} />
        <WhyChoose locale={locale} />
      </main>
    </>
  );
}