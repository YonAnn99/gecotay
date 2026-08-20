import type { Metadata } from "next";
import { EMPRESA, CONTACTO } from "../data/empresa";

export const metadata: Metadata = {
  title: "Aviso de privacidad | Grupo Ecotay",
  description:
    "Aviso de privacidad de Grupo Ecotay S.A.S. de C.V. conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDP).",
};

const secciones = [
  {
    titulo: "1. Consentimiento del titular",
    contenido: [
      "Al proporcionar tus datos personales, manifiestas que has leído, entendido y acordado los términos de este Aviso de privacidad.",
      "Otorgas tu consentimiento para el tratamiento de tus Datos Personales conforme a la LFPDP y legislación aplicable.",
      "En caso de que los Datos Personales recopilados incluyan datos sensibles o financieros, su entrega constituye tu consentimiento expreso.",
      "Otorgas tu consentimiento para que GRUPO ECOTAY S.A.S. de C.V. o sus Encargados realicen transferencias de Datos Personales a terceros nacionales o extranjeros.",
      "El consentimiento puede ser revocado en cualquier momento por el Titular.",
    ],
  },
  {
    titulo: "2. Recolección de los datos personales",
    contenido: [
      "La recolección de Datos Personales podrá efectuarse por comunicación telefónica, entrega directa, correos electrónicos, mensajes cortos de texto, o mediante la utilización de nuestros sitios web y herramientas de captura automática de datos.",
      "Ejemplos de información que podemos recopilar: nombre y apellidos, domicilio, correo electrónico, número telefónico, RFC, CURP y, en su caso, información bancaria para procesar pagos.",
    ],
  },
  {
    titulo: "3. Finalidad de los datos personales",
    contenido: [
      "Solicitar, comprar, cambiar o devolver productos ofrecidos por GRUPO ECOTAY S.A.S. de C.V.",
      "Solicitar, contratar, cambiar o cancelar servicios ofrecidos por la empresa.",
      "Efectuar pagos en línea y solicitar factura o comprobante fiscal digital.",
      "Solicitar una cotización sobre productos y servicios.",
      "Solicitar la entrega, reparación o cumplimiento de garantía de productos.",
      "Contactar el servicio de atención a clientes, compartir comentarios o sugerencias, y participar en encuestas.",
    ],
  },
  {
    titulo: "4. Recolección de datos al navegar en nuestros sitios web",
    contenido: [
      "Utilizamos cookies, web beacons y enlaces en correos electrónicos como herramientas de captura automática de datos en www.gecotay.com.",
      "Puedes modificar el formato de las comunicaciones o hacer caso omiso de los vínculos si prefieres que no se recopile información sobre tu interacción.",
    ],
  },
  {
    titulo: "5. Transferencias de datos",
    contenido: [
      "Manifiestas tu consentimiento para que el Responsable o cualquier Encargado realicen transferencias de Datos Personales a terceros nacionales o extranjeros, en el entendido de que el tratamiento se ajustará a lo establecido en este Aviso de privacidad.",
    ],
  },
  {
    titulo: "6. Limitación de uso y divulgación de la información",
    contenido: [
      "Conservaremos tus Datos Personales el tiempo necesario para procesar tus solicitudes y mantener registros contables, financieros y de auditoría.",
      "Los Datos Personales se encuentran protegidos por medidas de seguridad administrativas, técnicas y físicas adecuadas.",
    ],
  },
  {
    titulo: "7. Departamento de datos personales y domicilio",
    contenido: [
      "Para cualquier comunicación acerca de este Aviso de privacidad, contacta a nuestro Departamento de Datos Personales y/o quejas:",
      `Correo: ${CONTACTO.correos.quejas} / ${CONTACTO.correos.allservice}`,
      CONTACTO.direccionCompleta,
    ],
  },
  {
    titulo: "8. Procedimiento para ejercer los derechos ARCO",
    contenido: [
      "Tienes derecho a acceder, rectificar y cancelar tus datos personales, así como a oponerse al tratamiento de los mismos o revocar el consentimiento.",
      "La solicitud debe presentarse con nombre del titular, domicilio, teléfono y correo, documentos que acrediten la identidad, descripción clara de los Datos Personales, y cualquier otro elemento que facilite su localización.",
      "El Responsable responderá en un plazo máximo de veinte días hábiles desde la recepción de la solicitud.",
      "La entrega de los Datos Personales será gratuita; solo se cubrirán gastos justificados de envío o reproducción.",
    ],
  },
  {
    titulo: "9. Cambios al aviso de privacidad",
    contenido: [
      "GRUPO ECOTAY S.A.S. de C.V. se reserva el derecho de actualizar periódicamente el presente Aviso de privacidad, publicando los cambios en www.gecotay.com junto con la fecha de la última actualización.",
    ],
  },
];

export default function AvisoPrivacidadPage() {
  return (
    <>
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Aviso de <span className="text-primary">privacidad</span>
          </h1>
          <p className="text-lg text-gray-600">
            Aplicable a la información personal recopilada sobre el Titular por {EMPRESA.nombre}, en su
            carácter de Responsable, conforme a la LFPDP y sus disposiciones.
          </p>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {secciones.map((s) => (
            <div key={s.titulo}>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">{s.titulo}</h2>
              <ul className="space-y-3 text-gray-700 leading-relaxed">
                {s.contenido.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-primary mt-2 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl text-sm text-gray-700">
            <p className="font-semibold text-gray-900 mb-2">Última actualización</p>
            <p>
              Este Aviso de privacidad puede actualizarse periódicamente en www.gecotay.com. Para
              cualquier duda, contacta a {CONTACTO.correos.quejas} o {CONTACTO.correos.allservice}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}