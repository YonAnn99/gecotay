"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { LINEAS_PRODUCTO, NAVEGACION, SERVICIOS } from "../../data/empresa";
import { t } from "../../lib/i18n";

interface NavSearchProps {
  locale: string;
}

export const SEARCH_OPEN_EVENT = "gecotay:open-search";

function MagnifierIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
      />
    </svg>
  );
}

export default function NavSearch({ locale }: NavSearchProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(SEARCH_OPEN_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(SEARCH_OPEN_EVENT, onOpenEvent);
    };
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(`/${locale}${href}`);
    },
    [router, locale]
  );

  return (
    <>
      {/* Desktop trigger pill, centered between the two islands */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t(locale, "search.label")}
        className="hidden lg:flex fixed top-10 left-1/2 -translate-x-1/2 z-50
          items-center gap-3 w-72 h-16 px-5
          rounded-2xl bg-ink/75 backdrop-blur-2xl
          border border-white/10 shadow-2xl shadow-black/30
          text-white/50 transition-colors duration-200 hover:bg-ink/90"
      >
        <MagnifierIcon className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left text-sm">{t(locale, "search.placeholder")}</span>
        <kbd className="rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium tracking-wide">
          Ctrl K
        </kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label={t(locale, "search.label")}
        overlayClassName="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-sm"
        contentClassName="fixed left-1/2 top-[16vh] z-[9999] w-[calc(100vw-2rem)] max-w-xl -translate-x-1/2"
      >
        <div className="overflow-hidden rounded-2xl bg-ink border border-white/10 shadow-2xl shadow-black/50">
          <div className="flex items-center gap-3 border-b border-white/10 px-4">
            <MagnifierIcon className="h-4 w-4 shrink-0 text-white/40" />
            <Command.Input
              placeholder={t(locale, "search.placeholder")}
              className="h-13 w-full bg-transparent py-4 text-sm text-white placeholder:text-white/40 outline-none"
              autoFocus
            />
            <kbd className="rounded-md border border-white/15 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-white/50">
              Esc
            </kbd>
          </div>

          <Command.List className="max-h-[50vh] overflow-y-auto p-2">
            <Command.Empty className="px-3 py-8 text-center text-sm text-white/40">
              {t(locale, "search.empty")}
            </Command.Empty>

            <Command.Group
              heading={t(locale, "search.pages")}
              className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-primary/80"
            >
              {NAVEGACION.principal.map((page) => (
                <Command.Item
                  key={page.href}
                  value={page.label}
                  onSelect={() => go(page.href)}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/80 data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                >
                  <MagnifierIcon className="h-3.5 w-3.5 text-white/30" />
                  {page.label}
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading={t(locale, "search.products")}
              className="mt-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-primary/80"
            >
              {LINEAS_PRODUCTO.map((linea) => (
                <Command.Item
                  key={linea.slug}
                  value={`${linea.nombre} ${linea.descripcion}`}
                  onSelect={() => go(`/productos/${linea.slug}`)}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/80 data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                >
                  <MagnifierIcon className="h-3.5 w-3.5 shrink-0 text-white/30" />
                  <span className="truncate">{linea.nombre}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Group
              heading={t(locale, "search.services")}
              className="mt-1 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-primary/80"
            >
              {SERVICIOS.map((servicio) => (
                <Command.Item
                  key={servicio.slug}
                  value={`${servicio.titulo} ${servicio.descripcion}`}
                  onSelect={() => go("/servicios")}
                  className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/80 data-[selected=true]:bg-white/10 data-[selected=true]:text-white"
                >
                  <MagnifierIcon className="h-3.5 w-3.5 shrink-0 text-white/30" />
                  <span className="truncate">{servicio.titulo}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
}
