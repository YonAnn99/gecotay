"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = {
  empresa: [
    { href: "/nosotros", label: "Nosotros" },
    { href: "/proyectos", label: "Proyectos" },
    { href: "/certificaciones", label: "Certificaciones" },
    { href: "/sostenibilidad", label: "Sostenibilidad" },
  ],
  productos: [
    { href: "/oficinas", label: "Oficinas" },
    { href: "/contract", label: "Contract" },
    { href: "/colectividades", label: "Colectividades" },
    { href: "/acabados", label: "Acabados y tapices" },
  ],
  servicios: [
    { href: "/diseno", label: "Diseño a medida" },
    { href: "/fabricacion", label: "Fabricación" },
    { href: "/instalacion", label: "Instalación" },
    { href: "/mantenimiento", label: "Mantenimiento" },
  ],
  contacto: [
    { href: "/contacto", label: "Contacto" },
    { href: "/cotizar", label: "Solicitar presupuesto" },
    { href: "/distribuidores", label: "Distribuidores" },
    { href: "/trabaja-con-nosotros", label: "Trabaja con nosotros" },
  ],
};

const socialLinks = [
  { href: "https://linkedin.com", label: "LinkedIn", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  { href: "https://instagram.com", label: "Instagram", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.446-10.807c0 .797-.646 1.443-1.443 1.443-.796 0-1.443-.646-1.443-1.443s.647-1.443 1.443-1.443c.797 0 1.443.646 1.443 1.443z"/></svg> },
  { href: "https://youtube.com", label: "YouTube", icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg> },
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
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="GECOTAY - Inicio">
              <img src="/images/logo/logo-horizontal-white.webp" alt="" width="140" height="40" className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-gray-400 mb-6">
              Fabricantes de mobiliario de oficina, contract y equipamiento integral desde 1974.
            </p>
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

          {Object.entries(footerLinks).map(([key, links]) => (
            <motion.nav key={key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
              <h4 className="font-semibold text-white mb-4">{key.charAt(0).toUpperCase() + key.slice(1)}</h4>
<ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm hover:text-primary transition-colors duration-200">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        <motion.div
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-gray-500">
            © {currentYear} GECOTAY. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <Link href="/aviso-legal" className="hover:text-primary transition-colors">Aviso legal</Link>
            <span aria-hidden="true">·</span>
            <Link href="/politica-privacidad" className="hover:text-primary transition-colors">Política de privacidad</Link>
            <span aria-hidden="true">·</span>
            <Link href="/politica-cookies" className="hover:text-primary transition-colors">Cookies</Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}