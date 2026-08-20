"use client";

import { useState } from "react";

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    asunto: "",
    mensaje: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1000));
    setStatus("success");
    setFormData({ nombre: "", email: "", telefono: "", empresa: "", asunto: "", mensaje: "" });
  };

  const contacts = [
    { label: "Oficina central", value: "C/ Industria 42, 46980 Paterna (Valencia)", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 2 16.09 5.014 17.657 6.657a8 8 0 11-11.314 11.314z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
    { label: "Teléfono", value: "+34 96 123 45 67", href: "tel:+34961234567", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg> },
    { label: "Email comercial", value: "comercial@gecotay.com", href: "mailto:comercial@gecotay.com", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg> },
    { label: "Soporte técnico", value: "soporte@gecotay.com", href: "mailto:soporte@gecotay.com", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg> },
  ];

  const delegations = [
    { city: "Valencia (Central)", address: "C/ Industria 42, 46980 Paterna", phone: "+34 96 123 45 67", email: "valencia@gecotay.com" },
    { city: "Madrid", address: "Av. de Europa 12, 28108 Alcobendas", phone: "+34 91 234 56 78", email: "madrid@gecotay.com" },
    { city: "Barcelona", address: "C/ Roc Boronat 80, 08005 Barcelona", phone: "+34 93 345 67 89", email: "barcelona@gecotay.com" },
    { city: "Bilbao", address: "P. Tecnológico Zamudio, 48170 Zamudio", phone: "+34 94 456 78 90", email: "bilbao@gecotay.com" },
  ];

  return (
    <>
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            <span className="text-primary">Contacto</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Estamos para ayudarte. Rellena el formulario o usa cualquiera de nuestros canales directos.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Envíanos un mensaje</h2>
              {status === "success" && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
                  ¡Gracias! Tu mensaje se ha enviado correctamente. Te responderemos en menos de 24h laborables.
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                      placeholder="+34 6XX XX XX XX"
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
                    <option value="presupuesto">Solicitud de presupuesto</option>
                    <option value="proyecto">Consulta sobre proyecto</option>
                    <option value="tecnico">Soporte técnico / post-venta</option>
                    <option value="distribuidor">Ser distribuidor</option>
                    <option value="prensa">Prensa / comunicación</option>
                    <option value="otro">Otro</option>
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
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto px-8 py-4 font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Enviando..." : "Enviar mensaje"}
                </button>
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
                <h3 className="font-semibold mb-2">Horario comercial</h3>
                <p className="opacity-90 text-sm mb-4">Lunes a jueves: 8:00–18:00<br />Viernes: 8:00–15:00</p>
                <a href="/cotizar" className="inline-flex items-center gap-1 px-4 py-2 text-sm font-medium bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                  Solicitar llamada
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">Nuestras delegaciones</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {delegations.map((d, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                <h3 className="font-semibold text-gray-900 mb-2">{d.city}</h3>
                <p className="text-sm text-gray-600 mb-2">{d.address}</p>
                <a href={`tel:${d.phone.replace(/\s/g, '')}`} className="text-sm text-primary hover:underline block mb-1">{d.phone}</a>
                <a href={`mailto:${d.email}`} className="text-sm text-primary hover:underline">{d.email}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">¿Prefieres que te llamemos?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">Déjanos tu número y te contactamos en horario comercial.</p>
          <a href="/cotizar" className="inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors duration-200">
            Llamadme gratis
          </a>
        </div>
      </section>
    </>
  );
}