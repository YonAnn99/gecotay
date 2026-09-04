"use client";

import { useState } from "react";
import Link from "next/link";
import KeyTakeaways from "../../components/ui/KeyTakeaways";
import EarlyCTA from "../../components/ui/EarlyCTA";
import FAQSection from "../../components/ui/FAQSection";
import { EMPRESA, CONTACTO, REDES, POLITICAS } from "../../data/empresa";

interface ContactoPageProps {
  locale: string;
}

export default function ContactoPage({ locale }: ContactoPageProps) {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    asunto: "",
    mensaje: "",
  });
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const buildMensaje = () =>
    [
      `Hola Grupo Gecotay, soy ${formData.nombre}.`,
      formData.empresa ? `Empresa: ${formData.empresa}.` : "",
      formData.email ? `Email: ${formData.email}.` : "",
      formData.telefono ? `Teléfono: ${formData.telefono}.` : "",
      formData.asunto ? `Asunto: ${formData.asunto}.` : "",
      `Mensaje: ${formData.mensaje}`,
    ]
      .filter(Boolean)
      .join("\n");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mensaje = buildMensaje();
    window.open(
      `https://wa.me/${CONTACTO.whatsappIntl}?text=${encodeURIComponent(mensaje)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setStatus("success");
  };

  const mailtoLink = `mailto:${CONTACTO.correos.ventas}?subject=${encodeURIComponent(
    `[Web] ${formData.asunto || "Contacto"} - ${formData.nombre}`
  )}&body=${encodeURIComponent(buildMensaje())}`;

  const contacts = [
    {
      label: "Ventas",
      value: CONTACTO.telefono1,
      href: `tel:+52${CONTACTO.telefono1.replace(/\s/g, "")}`,
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg> },
    {
      label: "WhatsApp",
      value: CONTACTO.whatsapp,
      href: `https://wa.me/${CONTACTO.whatsappIntl}`,
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg> },
    {
      label: "Email comercial",
      value: CONTACTO.correos.ventas,
      href: `mailto:${CONTACTO.correos.ventas}`,
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
    {
      label: "Quejas y sugerencias",
      value: CONTACTO.correos.quejas,
      href: `mailto:${CONTACTO.correos.quejas}`,
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg> },
  ];

  const takeaways = [
    { label: "Líneas telefónicas", value: "3" },
    { label: "WhatsApp directo", value: "24/7" },
    { label: "Cobertura", value: "CDMX y área metropolitana" },
    { label: "Envíos", value: "2–15 días hábiles" },
  ];

  const faqs = [
    { q: "¿Cuánto tardan en responder?", a: "Respondemos en menos de 24 h laborables por los canales de ventas (teléfono, WhatsApp o correo)." },
    { q: "¿Cómo puedo solicitar una cotización?", a: "Puedes escribirnos por WhatsApp al 55 4152 2017, enviar un correo a ventas@gecotay.com o usar el formulario de /cotizar." },
    { q: "¿Hacen entregas fuera de CDMX?", a: "Sí. Los envíos tardan de 2 a 15 días hábiles dependiendo del producto y stock; los precios incluyen flete solo dentro de la CDMX y área metropolitana." },
    { q: "¿Dónde están ubicados?", a: "En Cda. de San Luis Potosí Mz. 2 Lt. 2, Col. Ejidos de Tulpetlac, Ecatepec de Morelos, Estado de México, C.P. 55114." },
  ];

  return (
    <>
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)] mb-4">
            <span className="text-primary">Contacto</span>
          </h1>
          <p className="text-xl text-gray-300 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)] max-w-2xl mx-auto">
            {EMPRESA.nombre} — {EMPRESA.lema}
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <KeyTakeaways items={takeaways} />
          <div className="mt-8 text-center">
            <EarlyCTA label="Solicitar presupuesto" href={`/${locale}/cotizar`} variant="primary" />
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <Link href={`/${locale}/productos`} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-1">Productos</h3>
              <p className="text-sm text-gray-600">20 líneas de mobiliario</p>
            </Link>
            <Link href={`/${locale}/servicios`} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-1">Servicios</h3>
              <p className="text-sm text-gray-600">Soluciones integrales</p>
            </Link>
            <Link href={`/${locale}/acabados-tapices`} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-1">Acabados y tapices</h3>
              <p className="text-sm text-gray-600">Materiales a tu elección</p>
            </Link>
            <Link href={`/${locale}/nosotros`} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-1">Nosotros</h3>
              <p className="text-sm text-gray-600">Quiénes somos</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)] mb-6">Envíanos un mensaje</h2>
              {status === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                  ¡Gracias! Se abrió WhatsApp con tu mensaje. Si no se abrió, también puedes
                  escribirnos por{" "}
                  <a href={mailtoLink} className="underline font-medium">
                    correo electrónico
                  </a>{" "}
                  a {CONTACTO.correos.ventas}.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                    <input
                      type="text"
                      id="nombre"
                      required
                      value={formData.nombre}
                      onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                    <input
                      type="tel"
                      id="telefono"
                      value={formData.telefono}
                      onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="55 XXXX XXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">Empresa / Organización</label>
                    <input
                      type="text"
                      id="empresa"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">Asunto *</label>
                  <select
                    id="asunto"
                    required
                    value={formData.asunto}
                    onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  >
                    <option value="">Selecciona un tema</option>
                    <option value="Solicitud de presupuesto">Solicitud de presupuesto</option>
                    <option value="Consulta sobre producto">Consulta sobre producto</option>
                    <option value="Servicio post-venta">Servicio post-venta</option>
                    <option value="Garantía">Garantía</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">Mensaje *</label>
                  <textarea
                    id="mensaje"
                    required
                    rows={5}
                    value={formData.mensaje}
                    onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Cuéntanos en qué podemos ayudarte..."
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors"
                  >
                    Enviar por WhatsApp
                  </button>
                  <a
                    href={mailtoLink}
                    className="w-full sm:w-auto px-8 py-4 font-semibold text-primary bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors text-center"
                  >
                    Enviar por correo
                  </a>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Canales directos</h3>
                <div className="space-y-4">
                  {contacts.map((c, i) => (
                    <a
                      key={i}
                      href={c.href || "#"}
                      target={c.href?.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 text-gray-700 hover:text-primary transition-colors group"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">{c.icon}</div>
                      <div>
                        <p className="font-medium">{c.label}</p>
                        <p className="text-sm text-gray-500">{c.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-primary text-white rounded-2xl">
                <h3 className="font-semibold mb-2">Dirección</h3>
                <p className="opacity-90 text-sm mb-4">{CONTACTO.direccionCompleta}</p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${CONTACTO.geo.lat},${CONTACTO.geo.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                >
                  Cómo llegar
                </a>
              </div>

              <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Redes sociales</h3>
                <div className="space-y-2">
                  {Object.values(REDES).map((r, i) => (
                    <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                      {r.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Ubicación</h2>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <iframe
              title="Ubicación de Grupo Gecotay"
              src={`https://www.google.com/maps?q=${CONTACTO.geo.lat},${CONTACTO.geo.lng}&z=16&output=embed`}
              className="w-full h-[420px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              sandbox="allow-scripts allow-same-origin allow-popups"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section id="politicas" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)] mb-2 text-center">Políticas de venta</h2>
          <p className="text-gray-300 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)] text-center mb-10 max-w-2xl mx-auto">
            {EMPRESA.nombre} pone a su disposición las siguientes políticas para que nuestros clientes estén mejor informados.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { titulo: "Ventas", items: POLITICAS.ventas },
              { titulo: "Precios", items: POLITICAS.precios },
              { titulo: "Envíos", items: POLITICAS.envios },
              { titulo: "Garantías", items: POLITICAS.garantias },
            ].map((bloque) => (
              <div key={bloque.titulo} className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary/30 transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-3">{bloque.titulo}</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {bloque.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqs} title="Preguntas frecuentes sobre contacto" />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)] mb-4">¿Prefieres que te contactemos?</h2>
          <p className="text-gray-300 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)] mb-8 max-w-xl mx-auto">
            Déjanos tu número por WhatsApp o correo y un ejecutivo de ventas te atenderá para tu cotización.
          </p>
          <a
            href={`https://wa.me/${CONTACTO.whatsappIntl}?text=${encodeURIComponent("Hola Grupo Gecotay, me gustaría recibir atención de ventas.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors duration-200"
          >
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}