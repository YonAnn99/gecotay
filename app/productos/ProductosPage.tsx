"use client";

import Image from "next/image";
import Link from "next/link";
import KeyTakeaways from "../components/ui/KeyTakeaways";
import EarlyCTA from "../components/ui/EarlyCTA";
import FAQSection from "../components/ui/FAQSection";

const categories = [
  {
    slug: "oficinas",
    title: "Oficinas",
    description: "Mesas, sillas, almacenaje y puestos operativos",
    image: "/images/categories/oficinas.webp",
    count: 48,
  },
  {
    slug: "contract",
    title: "Contract",
    description: "Mobiliario para hoteles, restaurantes y espacios públicos",
    image: "/images/categories/contract.webp",
    count: 32,
  },
  {
    slug: "colectividades",
    title: "Colectividades",
    description: "Soluciones para educación, sanidad y administración",
    image: "/images/categories/colectividades.webp",
    count: 24,
  },
  {
    slug: "direccion",
    title: "Dirección",
    description: "Despachos ejecutivos y salas de juntas premium",
    image: "/images/categories/direccion.webp",
    count: 16,
  },
  {
    slug: "acabados",
    title: "Acabados y tapices",
    description: "Telas, maderas, metales y superficies personalizables",
    image: "/images/categories/acabados.webp",
    count: 120,
  },
];

const featuredProducts = [
  {
    name: "Silla Operativa Ergo Pro",
    category: "Oficinas",
    price: "Desde 289€",
    image: "/images/products/ergo-pro.webp",
    badge: "Bestseller",
  },
  {
    name: "Mesa Height-Adjustable",
    category: "Oficinas",
    price: "Desde 459€",
    image: "/images/products/height-adjustable.webp",
    badge: "Nuevo",
  },
  {
    name: "Sofá Modular Contract",
    category: "Contract",
    price: "Bajo proyecto",
    image: "/images/products/modular-contract.webp",
    badge: "Personalizable",
  },
  {
    name: "Silla Apilable Colectividades",
    category: "Colectividades",
    price: "Desde 89€",
    image: "/images/products/apilable.webp",
    badge: "Stock",
  },
];

const takeaways = [
  { label: "Referencias en stock", value: "200+" },
  { label: "Categorías", value: "5" },
  { label: "Entrega península", value: "48 h" },
  { label: "Garantía", value: "5 años" },
];

const faqs = [
  { q: "¿Puedo pedir muestras de acabados?", a: "Sí, enviamos hasta 5 muestras gratuitas a tu dirección." },
  { q: "¿Cuál es el tiempo de fabricación?", a: "Entre 4 y 8 semanas según complejidad y acabado." },
  { q: "¿Ofrecen instalación?", a: "Contamos con equipo propio de montaje en toda la península." },
  { q: "¿Hay descuentos por volumen?", a: "A partir de 20 unidades aplicamos precios especiales." },
];

export default function ProductosPage() {
  return (
    <>
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Catálogo de <span className="text-primary">productos</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Más de 200 referencias en stock y fabricación a medida. Filtrá por categoría, acabado o uso.
          </p>
        </div>
      </section>

      <KeyTakeaways items={takeaways} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <EarlyCTA label="Solicitar catálogo completo" href="/cotizar" variant="primary" />
      </div>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-12">
            <h2 className="text-2xl font-semibold text-gray-900">Categorías</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-lg">Todos</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-primary hover:text-primary">Oficinas</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-primary hover:text-primary">Contract</button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:border-primary hover:text-primary">Dirección</button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/productos/${cat.slug}`}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-primary/90 rounded-full mb-2">{cat.count} productos</span>
                  <h3 className="text-xl font-bold text-white mb-1">{cat.title}</h3>
                  <p className="text-sm text-gray-200 line-clamp-2">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-semibold text-gray-900">Productos destacados</h2>
            <Link href="/productos" className="text-primary font-medium hover:underline">
              Ver catálogo completo →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, i) => (
              <article key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300">
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 25vw"
                  />
                  <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold bg-primary text-white rounded-full">
                    {product.badge}
                  </span>
                </div>
                <div className="p-5">
                  <span className="text-xs text-primary font-medium">{product.category}</span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-2 line-clamp-1">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold">{product.price}</span>
                    <Link
                      href={`/productos/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="Preguntas frecuentes sobre productos" />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            ¿No encontrás lo que buscás?
          </h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Fabricamos a medida según tus especificaciones. Contactá a nuestro equipo técnico.
          </p>
          <Link
            href="/cotizar"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors duration-200"
          >
            Solicitar proyecto a medida
          </Link>
        </div>
      </section>
    </>
  );
}