"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { EMPRESA, CONTACTO, REDES, NAVEGACION } from "../../data/empresa";

const socialLinks = [
  {
    href: REDES.facebook.url,
    label: "Facebook",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
  {
    href: REDES.instagram.url,
    label: "Instagram",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.446-10.807c0 .797-.646 1.443-1.443 1.443-.796 0-1.443-.646-1.443-1.443s.647-1.443 1.443-1.443c.797 0 1.443.646 1.443 1.443z"/></svg> },
  {
    href: REDES.youtube.url,
    label: "YouTube",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
  {
    href: REDES.twitter.url,
    label: "Twitter / X",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <motion.div className="col-span-2 lg:col-span-1" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label={`${EMPRESA.nombre} - Inicio`}>
              <Image src="/images/logo/logo-horizontal-white.webp" alt="" width="140" height="40" className="h-10 w-auto" priority />
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              {EMPRESA.nombre}. Fabricación y venta de mobiliario de oficina, hogar y espacios de trabajo.
            </p>
            <p className="text-sm text-gray-500 mb-6">{CONTACTO.direccionCompleta}</p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.nav initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
            <h4 className="font-semibold text-white mb-4">Explora</h4>
            <ul className="space-y-2">
              {NAVEGACION.principal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-primary transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>

          <motion.nav initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h4 className="font-semibold text-white mb-4">Información</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/descargas" className="text-sm hover:text-primary transition-colors duration-200">Descargas</Link>
              </li>
              <li>
                <Link href="/cotizar" className="text-sm hover:text-primary transition-colors duration-200">Solicitar presupuesto</Link>
              </li>
              <li>
                <Link href="/acabados-tapices" className="text-sm hover:text-primary transition-colors duration-200">Acabados y tapices</Link>
              </li>
              <li>
                <Link href="/aviso-privacidad" className="text-sm hover:text-primary transition-colors duration-200">Aviso de privacidad</Link>
              </li>
              <li>
                <Link href="/contacto#politicas" className="text-sm hover:text-primary transition-colors duration-200">Políticas de venta</Link>
              </li>
            </ul>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.25 }}>
            <h4 className="font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={`tel:+52${CONTACTO.telefono1.replace(/\s/g, "")}`} className="hover:text-primary transition-colors duration-200">
                  {CONTACTO.telefono1}
                </a>
              </li>
              <li>
                <a href={`tel:+52${CONTACTO.telefono2.replace(/\s/g, "")}`} className="hover:text-primary transition-colors duration-200">
                  {CONTACTO.telefono2}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${CONTACTO.whatsappIntl}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-200">
                  WhatsApp {CONTACTO.whatsapp}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACTO.correos.ventas}`} className="hover:text-primary transition-colors duration-200">
                  {CONTACTO.correos.ventas}
                </a>
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-gray-500">
            © {currentYear} {EMPRESA.nombre}. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <Link href="/aviso-privacidad" className="hover:text-primary transition-colors">Aviso de privacidad</Link>
            <span aria-hidden="true">·</span>
            <Link href="/contacto#politicas" className="hover:text-primary transition-colors">Políticas de venta</Link>
            <span aria-hidden="true">·</span>
            <Link href="/descargas" className="hover:text-primary transition-colors">Descargas</Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}