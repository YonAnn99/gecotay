"use client";

import { useState } from "react";
import Link from "next/link";
import KeyTakeaways from "../../components/ui/KeyTakeaways";
import EarlyCTA from "../../components/ui/EarlyCTA";
import FAQSection from "../../components/ui/FAQSection";
import { CONTACTO } from "../../data/empresa";

const steps = [
  { id: 1, title: "Datos", desc: "Tu información" },
  { id: 2, title: "Proyecto", desc: "Qué necesitas" },
  { id: 3, title: "Detalles", desc: "Especificaciones" },
  { id: 4, title: "Enviar", desc: "Revisar y enviar" },
];

const projectTypes = [
  { value: "oficinas", label: "Oficinas / Puestos de trabajo", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg> },
  { value: "juntas", label: "Salas de juntas / Dirección", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg> },
  { value: "recepcion", label: "Recepciones / Zonas de espera", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg> },
  { value: "silleria", label: "Sillería / Accesorios", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
  { value: "hogar", label: "Hogar (muebles a medida)", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V10"/></svg> },
  { value: "acabados", label: "Solo acabados / tapices / materiales", icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a5 5 0 0110 0h2a3 3 0 013 3v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a3 3 0 013-3h2z"/></svg> },
];

const timelines = [
  { value: "urgente", label: "Urgente (< 2 semanas)" },
  { value: "normal", label: "Estándar (2-6 semanas)" },
  { value: "planificado", label: "Planificado (1-3 meses)" },
  { value: "fase", label: "Por fases / largo plazo" },
];

const takeaways = [
  { label: "Pasos", value: "4" },
  { label: "Tiempo estimado", value: "< 5 min" },
  { label: "Respuesta", value: "< 24 h" },
  { label: "Sin compromiso", value: "100 %" },
];

const faqs = [
  { q: "¿Cuánto tarda en llegar el presupuesto?", a: "Recibirás la propuesta en 24‑48 h laborables." },
  { q: "¿Es vinculante la solicitud?", a: "No, es una solicitud sin compromiso; el presupuesto final se confirma tras revisión técnica." },
  { q: "¿Puedo adjuntar planos?", a: "Sí, una vez enviada tu solicitud por WhatsApp o correo, responde ahí mismo adjuntando tus planos, renders o referencias (PDF, DWG, JPG, PNG)." },
  { q: "¿Qué incluye el presupuesto?", a: "Planos, renders, memoria de calidades, desglose por partidas, planning, condiciones de pago y garantías." },
];

interface CotizarPageProps {
  locale: string;
}

export default function CotizarPage({ locale }: CotizarPageProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nombre: "", email: "", telefono: "", empresa: "", cargo: "",
    tipoProyecto: "", descripcion: "", ubicacion: "", superficie: "", plazo: "",
    presupuesto: "", servicios: [] as string[], observaciones: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const proyecto = projectTypes.find((p) => p.value === formData.tipoProyecto)?.label || "No especificado";
    const plazo = timelines.find((t) => t.value === formData.plazo)?.label || "No especificado";
    const mensaje = [
      "Hola Grupo Gecotay, quiero solicitar un presupuesto:",
      `Nombre: ${formData.nombre}`,
      `Email: ${formData.email}`,
      formData.telefono ? `Teléfono: ${formData.telefono}` : "",
      formData.empresa ? `Empresa: ${formData.empresa}` : "",
      formData.cargo ? `Cargo: ${formData.cargo}` : "",
      `Proyecto: ${proyecto}`,
      `Descripción: ${formData.descripcion}`,
      formData.ubicacion ? `Ubicación: ${formData.ubicacion}` : "",
      formData.superficie ? `Superficie: ${formData.superficie} m²` : "",
      `Plazo: ${plazo}`,
      formData.presupuesto ? `Presupuesto: ${formData.presupuesto}` : "",
      formData.servicios.length ? `Servicios: ${formData.servicios.join(", ")}` : "",
      formData.observaciones ? `Observaciones: ${formData.observaciones}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `https://wa.me/${CONTACTO.whatsappIntl}?text=${encodeURIComponent(mensaje)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setStatus("success");
  };

  const mailtoLink = `mailto:${CONTACTO.correos.ventas}?subject=${encodeURIComponent(
    `[Web] Solicitud de presupuesto - ${formData.nombre}`
  )}&body=${encodeURIComponent(
    [
      "Solicitud de presupuesto",
      `Nombre: ${formData.nombre}`,
      `Email: ${formData.email}`,
      `Teléfono: ${formData.telefono}`,
      formData.empresa ? `Empresa: ${formData.empresa}` : "",
      formData.cargo ? `Cargo: ${formData.cargo}` : "",
      `Proyecto: ${projectTypes.find((p) => p.value === formData.tipoProyecto)?.label || "No especificado"}`,
      `Descripción: ${formData.descripcion}`,
      `Ubicación: ${formData.ubicacion}`,
      `Superficie: ${formData.superficie} m²`,
      `Plazo: ${timelines.find((t) => t.value === formData.plazo)?.label || "No especificado"}`,
      `Presupuesto: ${formData.presupuesto}`,
      `Servicios: ${formData.servicios.join(", ")}`,
      formData.observaciones ? `Observaciones: ${formData.observaciones}` : "",
    ]
      .filter(Boolean)
      .join("\n")
  )}`;

  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form;
    if (form && !form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setStep((s) => Math.min(s + 1, 4));
  };
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const renderStep1 = () => (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-gray-900">Datos de contacto</h3>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
          <input type="text" id="nombre" required value={formData.nombre} onChange={(e) => handleChange("nombre", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Tu nombre" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input type="email" id="email" required value={formData.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="tu@email.com" />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
          <input type="tel" id="telefono" required value={formData.telefono} onChange={(e) => handleChange("telefono", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="+52 55 XXXX XXXX" />
        </div>
        <div>
          <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">Empresa / Organización</label>
          <input type="text" id="empresa" value={formData.empresa} onChange={(e) => handleChange("empresa", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Nombre de tu empresa" />
        </div>
      </div>
      <div>
        <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">Cargo / Departamento</label>
        <input type="text" id="cargo" value={formData.cargo} onChange={(e) => handleChange("cargo", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ej. Gerente, Arquitecto, Facility Manager..." />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-gray-900">Tipo de proyecto</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        {projectTypes.map((pt) => (
          <button
            key={pt.value}
            type="button"
            onClick={() => handleChange("tipoProyecto", pt.value)}
            className={`p-4 rounded-xl border-2 text-left transition-all ${formData.tipoProyecto === pt.value ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"}`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.tipoProyecto === pt.value ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}>{pt.icon}</div>
              <span className="font-medium text-gray-900">{pt.label}</span>
            </div>
          </button>
        ))}
      </div>
      <div>
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">Describe tu necesidad *</label>
        <textarea id="descripcion" required rows={4} value={formData.descripcion} onChange={(e) => handleChange("descripcion", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none" placeholder="Cuéntanos qué necesitas: número de puestos, tipo de espacios, estilo, referencias..." />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="ubicacion" className="block text-sm font-medium text-gray-700 mb-1">Ubicación del proyecto *</label>
          <input type="text" id="ubicacion" required value={formData.ubicacion} onChange={(e) => handleChange("ubicacion", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ciudad, código postal, país" />
        </div>
        <div>
          <label htmlFor="superficie" className="block text-sm font-medium text-gray-700 mb-1">Superficie aprox. (m²)</label>
          <input type="text" id="superficie" value={formData.superficie} onChange={(e) => handleChange("superficie", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent" placeholder="Ej. 500" />
        </div>
      </div>
      <div>
        <label htmlFor="plazo" className="block text-sm font-medium text-gray-700 mb-1">Plazo deseado *</label>
        <select id="plazo" required value={formData.plazo} onChange={(e) => handleChange("plazo", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent">
          <option value="">Selecciona plazo</option>
          {timelines.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-5">
      <h3 className="text-lg font-semibold text-gray-900">Detalles adicionales</h3>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Presupuesto orientativo</label>
        <select value={formData.presupuesto} onChange={(e) => handleChange("presupuesto", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent">
          <option value="">No definido / Consultar</option>
          <option value="<50k">&lt; 50.000 MXN</option>
          <option value="50-100k">50.000 – 100.000 MXN</option>
          <option value="100-250k">100.000 – 250.000 MXN</option>
          <option value="250-500k">250.000 – 500.000 MXN</option>
          <option value=">500k">&gt; 500.000 MXN</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Servicios que necesitas</label>
        <div className="grid sm:grid-cols-2 gap-3">
          {[["Atención personalizada", "atencion"], ["Planeación de espacios", "planeacion"], ["Entrega e instalación", "instalacion"], ["Mantenimiento", "mantenimiento"], ["Carpintería / Ebanistería", "carpinteria"], ["Tapicería", "tapiceria"]].map(([label, val]) => (
            <label key={val} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:border-primary/50 cursor-pointer">
              <input type="checkbox" value={val} checked={formData.servicios.includes(val)} onChange={(e) => handleChange("servicios", e.target.checked ? [...formData.servicios, val] : formData.servicios.filter((v) => v !== val))} className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl text-sm text-primary">
        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        ¿Tienes planos, renders o referencias? Envíalos respondiendo al chat de WhatsApp o al correo una vez que recibas tu solicitud enviada — este formulario no permite adjuntar archivos directamente.
      </div>
      <div>
        <label htmlFor="observaciones" className="block text-sm font-medium text-gray-700 mb-1">Observaciones adicionales</label>
        <textarea id="observaciones" rows={3} value={formData.observaciones} onChange={(e) => handleChange("observaciones", e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-none" placeholder="Normativas especiales, accesos, horarios de obra, contactos en obra..." />
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Revisa tu solicitud</h3>
      <div className="p-4 bg-gray-50 rounded-xl space-y-3 text-sm">
        <p><span className="font-medium text-gray-900">Nombre:</span> {formData.nombre} ({formData.email}, {formData.telefono})</p>
        <p><span className="font-medium text-gray-900">Empresa:</span> {formData.empresa || "—"} {formData.cargo ? `· ${formData.cargo}` : ""}</p>
        <p><span className="font-medium text-gray-900">Proyecto:</span> {projectTypes.find((p) => p.value === formData.tipoProyecto)?.label || "—"}</p>
        <p><span className="font-medium text-gray-900">Ubicación:</span> {formData.ubicacion} · {formData.superficie} m²</p>
        <p><span className="font-medium text-gray-900">Plazo:</span> {timelines.find((t) => t.value === formData.plazo)?.label || "—"}</p>
        <p><span className="font-medium text-gray-900">Presupuesto:</span> {formData.presupuesto || "No indicado"}</p>
        <p><span className="font-medium text-gray-900">Servicios:</span> {formData.servicios.length ? formData.servicios.join(", ") : "Ninguno seleccionado"}</p>
      </div>
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl text-sm text-primary">
        <svg className="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Al enviar, aceptas nuestro <Link href={`/${locale}/aviso-privacidad`} className="underline hover:text-primary-dark">Aviso de privacidad</Link>. Trataremos tus datos para responder a tu solicitud de presupuesto.
      </div>
      {status === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-800">
          ¡Gracias! Se abrió WhatsApp con tu solicitud. Si no se abrió, también puedes enviarla por{" "}
          <a href={mailtoLink} className="underline font-medium">correo electrónico</a> a {CONTACTO.correos.ventas}.
        </div>
      )}
    </div>
  );

  return (
    <>
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 [text-shadow:0_1px_3px_rgba(0,0,0,0.9),0_2px_14px_rgba(0,0,0,0.6)] mb-4">
            Solicita tu <span className="text-primary">presupuesto</span>
          </h1>
          <p className="text-xl text-gray-300 [text-shadow:0_1px_3px_rgba(0,0,0,0.85),0_2px_12px_rgba(0,0,0,0.55)] max-w-2xl mx-auto">
            Cuéntanos tu proyecto y recibirás una propuesta técnica y económica sin compromiso en 24-48h.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <KeyTakeaways items={takeaways} />
          <div className="mt-8 text-center">
            <EarlyCTA label="Comenzar solicitud" href={`/${locale}/cotizar`} variant="primary" />
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <Link href={`/${locale}/productos`} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-1">Productos</h3>
              <p className="text-sm text-gray-600">Catálogo completo</p>
            </Link>
            <Link href={`/${locale}/servicios`} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-1">Servicios</h3>
              <p className="text-sm text-gray-600">Soluciones integrales</p>
            </Link>
            <Link href={`/${locale}/acabados-tapices`} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-1">Acabados y tapices</h3>
              <p className="text-sm text-gray-600">Materiales certificados</p>
            </Link>
            <Link href={`/${locale}/contacto`} className="p-4 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <h3 className="font-semibold text-gray-900 mb-1">Contacto</h3>
              <p className="text-sm text-gray-600">Canales directos</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            {steps.map((s, i) => (
              <div key={s.id} className="flex flex-col items-center relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${step >= s.id ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}>
                  {step > s.id ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg> : s.id}
                </div>
                <span className="text-xs text-gray-400 mt-1 text-center w-24">{s.title}</span>
                {i < steps.length - 1 && <div className={`absolute top-5 left-1/2 w-full h-0.5 ${step > s.id ? "bg-primary" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-sm">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button type="button" onClick={prevStep} disabled={step === 1} className="px-6 py-3 font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-colors disabled:opacity-50">
                ← Anterior
              </button>
              <div className="flex gap-3">
                {step < 4 && (
                  <button type="button" onClick={nextStep} className="px-6 py-3 font-medium text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors">
                    Siguiente →
                  </button>
                )}
                {step === 4 && (
                  <button type="submit" className="px-8 py-3 font-semibold text-white bg-primary hover:bg-primary-dark rounded-xl transition-colors">
                    Enviar por WhatsApp
                  </button>
                )}
              </div>
            </div>
            {step === 4 && (
              <a
                href={mailtoLink}
                className="mt-4 block text-center text-sm font-medium text-primary hover:underline"
              >
                O enviar la solicitud por correo electrónico
              </a>
            )}
          </form>
        </div>
      </section>

      <FAQSection items={faqs} title="Preguntas frecuentes sobre presupuestos" />

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">¿Qué incluye tu presupuesto?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Planos de distribución y renders",
              "Memoria de calidades y acabados",
              "Desglose por partidas y concepto",
              "Planning de entrega estimado",
              "Condiciones de pago y garantías",
              "Opcionales: instalación y mantenimiento",
            ].map((item, i) => (
              <div key={i} className="p-6 bg-white rounded-2xl border border-gray-100 flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}