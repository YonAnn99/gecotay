"use client";

interface Takeaway {
  label: string;
  value: string | number;
}

interface KeyTakeawaysProps {
  items: Takeaway[];
}

export default function KeyTakeaways({ items }: KeyTakeawaysProps) {
  return (
    <section className="py-12 bg-primary/5" aria-labelledby="tldr-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 id="tldr-heading" className="sr-only">
          Resumen rápido
        </h2>
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {items.map((item, idx) => (
            <li key={idx} className="p-4 bg-white rounded-xl shadow-sm">
              <strong className="block text-primary text-lg mb-1">{item.value}</strong>
              <span className="text-gray-600">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}