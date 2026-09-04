// NEXT_PUBLIC_SITE_URL lets each Vercel environment (production on
// gecotay.com, preview deployments, local dev) resolve to its own origin
// without a code change; the literal stays as the production fallback so
// `npm run build` still works with no .env.local present.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.gecotay.com";

export const EMPRESA = {
  nombre: "Grupo Gecotay S.A.S. de C.V.",
  nombreCorto: "Grupo Gecotay",
  lema: "Su espacio en nuestras manos...",
  url: SITE_URL,
  rfc: "GEC180710HU8",
  dominio: new URL(SITE_URL).hostname.replace(/^www\./, ""),
  year: new Date().getFullYear(),
};

export const CONTACTO = {
  telefono1: "55 5027 0661",
  telefono2: "55 1562 0103",
  telefono3: "55 7676 5844",
  whatsapp: "55 4152 2017",
  whatsappIntl: "525541522017",
  correos: {
    ventas: "ventas@gecotay.com",
    ventas2: "ventas2@gecotay.com",
    allservice: "allservice@gecotay.com",
    gmail: "gecotay@gmail.com",
    quejas: "quejas@gecotay.com",
  },
  direccion: "Cda. de San Luis Potosí Mz. 2 Lt. 2",
  colonia: "Col. Ejidos de Tulpetlac",
  municipio: "Ecatepec de Morelos",
  estado: "Estado de México",
  cp: "55114",
  direccionCompleta:
    "Cda. de San Luis Potosí Mz. 2 Lt. 2, Col. Ejidos de Tulpetlac, Ecatepec de Morelos, Estado de México, C.P. 55114",
  geo: { lat: 19.56269, lng: -99.022121 },
  plusCode: "HX7H+35 Ecatepec de Morelos",
};

export const REDES = {
  facebook: { label: "Mobiliario Gecotay", url: "https://www.facebook.com/search/top?q=mobiliario%20ecotay" },
  instagram: { label: "@Grupo_Ecotay", url: "https://www.instagram.com/Grupo_Ecotay" },
  youtube: { label: "Grupo Gecotay", url: "https://www.youtube.com/@GrupoEcotay" },
  twitter: { label: "@grupoecotay", url: "https://x.com/grupoecotay" },
};

export const VALORES = [
  {
    nombre: "Liderazgo",
    descripcion:
      "La habilidad que desarrolla un individuo que influye en la forma de actuar de las personas, haciendo que este equipo trabaje con entusiasmo logrando metas y objetivos.",
  },
  {
    nombre: "Colaboración",
    descripcion:
      "Ayudar y servir de manera espontánea a nuestros semejantes, sumando esfuerzos para lograr los mejores resultados.",
  },
  {
    nombre: "Pasión",
    descripcion:
      "Hacer con el corazón y la razón cada una de nuestras actividades de trabajo.",
  },
  {
    nombre: "Calidad",
    descripcion:
      "Excelencia en productos y el mejor servicio, para evitar garantías y lograr la mejora continua.",
  },
  {
    nombre: "Puntualidad",
    descripcion:
      "Parte importante de respetar los horarios y días de entrega hacia nuestros clientes.",
  },
  {
    nombre: "Respeto",
    descripcion: "Valorar y apreciar a nuestros semejantes.",
  },
  {
    nombre: "Gratitud",
    descripcion:
      "Estimar el voto de confianza que los clientes nos hacen al darnos su preferencia como empresa.",
  },
  {
    nombre: "Humildad",
    descripcion:
      "Ser siempre sujetos modestos, que no se sienten más importantes o superiores, independientemente del puesto ejecutivo de cada persona en la empresa.",
  },
];

export const NOSOTROS = {
  quienesSomos:
    "Grupo Gecotay S.A.S. de C.V. es un grupo de empresas de diferentes sectores dedicado a la fabricación, distribución y comercialización de mobiliario de excelente calidad y servicios integrales para oficina, hogar y espacios de trabajo. Trabajamos de la mano con el cliente para ser la mejor opción en el mercado.",
  mision:
    "Ofertar, crear e innovar mobiliario de excelente calidad y servicios que le den plus valor a sus productos. Trabajando junto con el cliente de la mano para ser la mejor opción en el mercado, encontrando en nosotros todo lo que necesita. Forjándonos de tal manera que utilizaremos nuestro mayor esfuerzo para satisfacer las necesidades, a un precio justo.",
  vision:
    "Ser una empresa de renombre en el mercado, caracterizada por sus buenos productos, servicios y precios. Conformada por equipos que desempeñen su buen trabajo y que creen un ambiente sano en donde el personal de Grupo Gecotay S.A.S. de C.V. se inspire para dar lo mejor de sí, ofreciendo así un producto que satisface las necesidades y deseos de los clientes.",
  garantia:
    "Todos los productos fabricados y distribuidos por Grupo Gecotay cuentan con 1 año de garantía contra defectos de fabricación, y en productos de gama alta 60 meses de garantía. La garantía se hace válida con una simple llamada de notificación y el departamento correspondiente le dará seguimiento para su reparación o, en su defecto, cambio físico del producto.",
};

export const POLITICAS = {
  ventas: [
    "Todas las compras sin excepción tendrán que ser por escrito (llenar formato de pedido y/o confirmadas por correo electrónico).",
    "Antes de generar un pedido es responsabilidad del cliente consultar existencias; de lo contrario la empresa no se compromete a respetar los tiempos de entrega pactados en las cotizaciones una vez vencidas.",
    "El personal de Grupo Gecotay no está autorizado para recibir dinero en efectivo, a menos que así se acuerde con el cliente en plena confidencialidad.",
    "Toda cancelación o cambio de producto dentro de los 5 primeros días se penaliza con el 20% del total cancelado; después de 5 días no se podrá hacer cancelación o cambio de modelo.",
  ],
  precios: [
    "Todos los precios publicados en las cotizaciones son más el 16% correspondiente al IVA.",
    "Los precios incluyen flete y maniobras solo dentro de la CDMX y área metropolitana, colocando los productos en planta baja (toda maniobra adicional se cobra por separado con previa autorización).",
    "Los precios pueden variar sin previo aviso dependiendo de la variación del tipo de cambio.",
  ],
  envios: [
    "Todos los productos incluyen tiempo de envío de 2 a 15 días hábiles dependiendo del tipo de producto y stock. Estos tiempos se especifican al momento de la compra.",
    "Todas las entregas se realizan a pie de camión y/o planta baja.",
    "Las entregas se realizan el día estipulado previamente en horario abierto de 10:00 a 18:00 hrs (salvo excepciones de común acuerdo).",
  ],
  garantias: [
    "Todos los productos fabricados y distribuidos cuentan con 12 meses de garantía contra defectos de fabricación; en productos de gama alta 60 meses (consultar con su vendedor).",
    "En telas, mallas, viniles, pieles, hule espuma, madera natural, triplay, vidrio, aluminio, acrílicos, policarbonatos y partes eléctricas no hay garantía.",
    "Todos los productos incluyen una etiqueta foliada que facilita el procedimiento de garantía de la pieza.",
  ],
};

export const SERVICIOS = [
  {
    slug: "atencion-personalizada",
    titulo: "Atención personalizada y capacitada",
    descripcion:
      "Contamos con personal altamente capacitado para ofrecer soluciones inmediatas a las necesidades de nuestros clientes.",
    imagen: "/images/services/atencion-personalizada.webp",
  },
  {
    slug: "post-venta",
    titulo: "Servicio post-venta",
    descripcion:
      "El servicio de comunicación después de la venta es indispensable para nuestros ejecutivos de ventas, quienes estarán a sus órdenes para recibir sus comentarios, inquietudes o necesidades.",
    imagen: "/images/services/post-venta.webp",
  },
  {
    slug: "planeacion-espacios",
    titulo: "Planeación de espacios",
    descripcion:
      "Para tener un área laboral eficiente es importante hacer la planeación oportuna del espacio; ofrecemos proyecciones tipo render que asemejan la realidad de los espacios.",
    imagen: "/images/services/planeacion-espacios.webp",
  },
  {
    slug: "entrega-instalacion",
    titulo: "Entrega e instalación",
    descripcion:
      "Todos nuestros productos en área metropolitana se entregan al cliente ya ensamblados y sin costo alguno en planta baja, porque la satisfacción del cliente es nuestra prioridad.",
    imagen: "/images/services/entrega-instalacion.webp",
  },
  {
    slug: "mantenimiento",
    titulo: "Mantenimiento",
    descripcion:
      "Nuestros colaboradores tienen capacitaciones constantes para realizar mantenimientos preventivos y correctivos, con la finalidad de alargar la vida de su mobiliario.",
    imagen: "/images/services/mantenimiento.webp",
  },
  {
    slug: "carpinteria",
    titulo: "Carpintería",
    descripcion:
      "Contamos con los servicios generales de carpintería y barnices para satisfacer gustos y brindar los mejores acabados y diseños en madera natural.",
    imagen: "/images/services/carpinteria.webp",
  },
  {
    slug: "ebanisteria",
    titulo: "Ebanistería",
    descripcion:
      "Si el cliente es más exigente con su mobiliario de madera natural, podemos personalizar con tallas y chapas en madera natural de su preferencia.",
    imagen: "/images/services/ebanisteria.webp",
  },
  {
    slug: "tapiceria",
    titulo: "Tapicería",
    descripcion:
      "Contamos con el personal indicado para realizar cualquier tipo de reparación respecto a tapizados de mobiliario, ya sean de telas, vinilos y/o pieles naturales.",
    imagen: "/images/services/tapiceria.webp",
  },
  {
    slug: "transporte",
    titulo: "Transporte",
    descripcion:
      "Gecotay, como su nombre lo indica, es un grupo de empresas de diferentes sectores; ofertamos el servicio de mudanzas y traslados de mercancías, así como reubicaciones de mobiliario.",
    imagen: "/images/services/transporte.webp",
  },
  {
    slug: "herreria-aluminio",
    titulo: "Herretería y aluminio",
    descripcion:
      "Ofrecemos servicios adicionales tales como venta de material ferretero, herrería general y mobiliario de aluminio, para estar presentes en todos los materiales de fabricación.",
    imagen: "/images/services/herreria-aluminio.webp",
  },
  {
    slug: "comidas-empresariales",
    titulo: "Comidas empresariales",
    descripcion:
      "Dentro de nuestros servicios adicionales ofertamos comidas empresariales tipo buffet para amenizar sus eventos de cualquier tipo.",
    imagen: "/images/services/comidas-empresariales.webp",
  },
];

export interface LineaProducto {
  slug: string;
  nombre: string;
  descripcion: string;
  imagen: string;
  precioDesde: number;
  galeria: string[];
  esNuevo?: boolean;
}

export const LINEAS_PRODUCTO: LineaProducto[] = [
  {
    slug: "ceri",
    nombre: "Línea Ceri",
    descripcion:
      "Línea de tendencia modernista con estructura tubular semi triangular de importación con decoraciones en cromo, que refleja elegancia, confort y resistencia al mismo tiempo.",
    imagen: "/images/products/ceri-portada.webp",
    precioDesde: 5499,
    galeria: ["/images/products/ceri/01.webp", "/images/products/ceri/02.webp", "/images/products/ceri/03.webp", "/images/products/ceri/04.webp"],
  },
  {
    slug: "silver",
    nombre: "Línea Silver",
    descripcion:
      "Para innovar los espacios con un ambiente fresco, limpio y cómodo, con estructura tubular cuadrada de importación tipo portería y canaleta de ducto pasacable oculto.",
    imagen: "/images/products/silver-portada.webp",
    precioDesde: 4899,
    galeria: ["/images/products/silver/01.webp", "/images/products/silver/02.webp", "/images/products/silver/03.webp", "/images/products/silver/04.webp"],
  },
  {
    slug: "crome-b",
    nombre: "Línea Chrome B",
    descripcion:
      "Para estancias más selectivas, con estructura de importación a piso de 2 desniveles cromados con tubular redondo en cada pilar, dando un acabado minimalista y versátil.",
    imagen: "/images/products/crome-b-portada.webp",
    precioDesde: 7999,
    galeria: ["/images/products/chrome-b/01.webp", "/images/products/chrome-b/02.webp", "/images/products/chrome-b/03.webp"],
  },
  {
    slug: "crome-z",
    nombre: "Línea Chrome Z",
    descripcion:
      "Diseños sencillos pero elegantes; su estructura cromada o blanca simula estar abierta y permite al usuario mayor amplitud para desplazarse por todo el espacio.",
    imagen: "/images/products/crome-z-portada.webp",
    precioDesde: 8299,
    galeria: ["/images/products/chrome-z/01.webp", "/images/products/chrome-z/02.webp", "/images/products/chrome-z/03.webp"],
  },
  {
    slug: "alf",
    nombre: "Línea Alf",
    descripcion:
      "Diseño contemporáneo con estructura de importación de líneas limpias, ideal para espacios que buscan equilibrio entre estética y funcionalidad.",
    imagen: "/images/products/alf-portada.webp",
    precioDesde: 5899,
    galeria: ["/images/products/alf/01.webp", "/images/products/alf/02.webp", "/images/products/alf/03.webp", "/images/products/alf/04.webp"],
  },
  {
    slug: "desk-tech",
    nombre: "Línea Desk Tech",
    descripcion:
      "Productos económicos, configuraciones rápidas y espacios cableados limpios; patas y ductos pasa cables ocultos que permiten diferentes configuraciones solo cambiando medidas de cubiertas.",
    imagen: "/images/products/desk-tech-portada.webp",
    precioDesde: 3199,
    galeria: ["/images/products/desk-tech/01.webp", "/images/products/desk-tech/02.webp", "/images/products/desk-tech/03.webp", "/images/products/desk-tech/04.webp", "/images/products/desk-tech/05.webp", "/images/products/desk-tech/06.webp", "/images/products/desk-tech/07.webp"],
  },
  {
    slug: "nova",
    nombre: "Línea Nova",
    descripcion:
      "Escritorios clásicos de gran durabilidad y resistencia; para quienes son conservadores y saben elegir la mejor opción.",
    imagen: "/images/products/nova-portada.webp",
    precioDesde: 4699,
    galeria: ["/images/products/nova/01.webp", "/images/products/nova/02.webp", "/images/products/nova/03.webp", "/images/products/nova/04.webp", "/images/products/nova/05.webp"],
  },
  {
    slug: "deskan",
    nombre: "Línea Deskan / JAV",
    descripcion:
      "Producción mexicana con tendencias mundiales y mano de obra calificada nacional en estructuras metálicas; incluye línea de cafetería y exterior con mesas, sillas y mesa bancos.",
    imagen: "/images/products/deskan-portada.webp",
    precioDesde: 3599,
    galeria: ["/images/products/deskan/01.webp", "/images/products/deskan/02.webp", "/images/products/deskan/03.webp", "/images/products/deskan/04.webp", "/images/products/deskan/05.webp", "/images/products/deskan/06.webp", "/images/products/deskan/07.webp", "/images/products/deskan/08.webp", "/images/products/deskan/09.webp", "/images/products/deskan/10.webp"],
  },
  {
    slug: "gecotay",
    nombre: "Línea Gecotay",
    descripcion:
      "Siempre presente en todas las oficinas, con diferentes configuraciones, colores, tamaños y diseños en melamina, MDF, triplay y madera natural, con acabados en cortes rectos.",
    imagen: "/images/products/gecotay-portada.webp",
    precioDesde: 6999,
    galeria: ["/images/products/gecotay/01.webp", "/images/products/gecotay/02.webp", "/images/products/gecotay/03.webp", "/images/products/gecotay/04.webp", "/images/products/gecotay/05.webp", "/images/products/gecotay/06.webp", "/images/products/gecotay/07.webp", "/images/products/gecotay/08.webp"],
  },
  {
    slug: "gecot",
    nombre: "Línea Gecot",
    descripcion:
      "Presente en todas las oficinas con configuraciones, colores, tamaños y diseños en melamina, MDF, triplay y madera natural, con acabados en cortes curvos.",
    imagen: "/images/products/gecot-portada.webp",
    precioDesde: 7199,
    galeria: ["/images/products/gecot/01.webp", "/images/products/gecot/02.webp", "/images/products/gecot/03.webp", "/images/products/gecot/04.webp", "/images/products/gecot/05.webp", "/images/products/gecot/06.webp"],
  },
  {
    slug: "sim",
    nombre: "Línea SIM",
    descripcion:
      "Sistemas modulares que permiten el máximo número de empleados en una sola área, con diseños de combinación de líneas; se recomienda el apoyo de un ejecutivo de ventas para maximizar el espacio.",
    imagen: "/images/products/sim-portada.webp",
    precioDesde: 7899,
    galeria: ["/images/products/sim/01.webp", "/images/products/sim/02.webp", "/images/products/sim/03.webp", "/images/products/sim/04.webp", "/images/products/sim/05.webp"],
    esNuevo: true,
  },
  {
    slug: "workspace",
    nombre: "Work Space",
    descripcion:
      "Módulos de trabajo que concentran todo en un solo lugar: cajoneras, libreros, electrificación, privacidad, seguridad y reducción de espacios. Para cotizar se requiere levantamiento de proyecto.",
    imagen: "/images/products/workspace-portada.webp",
    precioDesde: 9999,
    galeria: ["/images/products/workspace/01.webp", "/images/products/workspace/02.webp", "/images/products/workspace/03.webp", "/images/products/workspace/04.webp", "/images/products/workspace/05.webp", "/images/products/workspace/06.webp", "/images/products/workspace/07.webp", "/images/products/workspace/08.webp", "/images/products/workspace/09.webp", "/images/products/workspace/10.webp", "/images/products/workspace/11.webp", "/images/products/workspace/12.webp", "/images/products/workspace/13.webp", "/images/products/workspace/14.webp", "/images/products/workspace/15.webp", "/images/products/workspace/16.webp"],
    esNuevo: true,
  },
  {
    slug: "salas-juntas",
    nombre: "Salas de juntas",
    descripcion:
      "Salas de juntas funcionales, equipadas con tecnología y estilizadas a sus oficinas, para las reuniones que llevan al éxito de una gran empresa.",
    imagen: "/images/products/salas-juntas-portada.webp",
    precioDesde: 12999,
    galeria: ["/images/products/salas-juntas/01.webp", "/images/products/salas-juntas/02.webp", "/images/products/salas-juntas/03.webp", "/images/products/salas-juntas/04.webp", "/images/products/salas-juntas/05.webp", "/images/products/salas-juntas/06.webp", "/images/products/salas-juntas/07.webp", "/images/products/salas-juntas/08.webp", "/images/products/salas-juntas/09.webp", "/images/products/salas-juntas/10.webp", "/images/products/salas-juntas/11.webp", "/images/products/salas-juntas/12.webp", "/images/products/salas-juntas/13.webp", "/images/products/salas-juntas/14.webp", "/images/products/salas-juntas/15.webp", "/images/products/salas-juntas/16.webp", "/images/products/salas-juntas/17.webp", "/images/products/salas-juntas/18.webp", "/images/products/salas-juntas/19.webp", "/images/products/salas-juntas/20.webp", "/images/products/salas-juntas/21.webp", "/images/products/salas-juntas/22.webp", "/images/products/salas-juntas/23.webp", "/images/products/salas-juntas/24.webp"],
    esNuevo: true,
  },
  {
    slug: "recepciones",
    nombre: "Recepciones",
    descripcion:
      "Toda empresa necesita dar la mejor impresión a primera vista; ofrecemos recepciones de importación y diseños nacionales a su medida y presupuesto.",
    imagen: "/images/products/recepciones-portada.webp",
    precioDesde: 8499,
    galeria: ["/images/products/recepciones/01.webp", "/images/products/recepciones/02.webp", "/images/products/recepciones/03.webp", "/images/products/recepciones/04.webp", "/images/products/recepciones/05.webp", "/images/products/recepciones/06.webp", "/images/products/recepciones/07.webp", "/images/products/recepciones/08.webp", "/images/products/recepciones/09.webp", "/images/products/recepciones/10.webp", "/images/products/recepciones/11.webp", "/images/products/recepciones/12.webp", "/images/products/recepciones/13.webp", "/images/products/recepciones/14.webp", "/images/products/recepciones/15.webp", "/images/products/recepciones/16.webp", "/images/products/recepciones/17.webp", "/images/products/recepciones/18.webp", "/images/products/recepciones/19.webp", "/images/products/recepciones/20.webp", "/images/products/recepciones/21.webp", "/images/products/recepciones/22.webp", "/images/products/recepciones/23.webp", "/images/products/recepciones/24.webp", "/images/products/recepciones/25.webp"],
    esNuevo: true,
  },
  {
    slug: "almacenamiento",
    nombre: "Sistemas de almacenamiento",
    descripcion:
      "Cajoneras, libreros, gabinetes, lockers, anaqueles y archiveros horizontales y verticales de madera y/o metálicos, fabricados con los mejores estándares de calidad nacional e importada.",
    imagen: "/images/products/almacenamiento-portada.webp",
    precioDesde: 3999,
    galeria: ["/images/products/almacenamiento/01.webp", "/images/products/almacenamiento/02.webp", "/images/products/almacenamiento/03.webp", "/images/products/almacenamiento/04.webp", "/images/products/almacenamiento/05.webp", "/images/products/almacenamiento/06.webp", "/images/products/almacenamiento/07.webp", "/images/products/almacenamiento/08.webp", "/images/products/almacenamiento/09.webp", "/images/products/almacenamiento/10.webp", "/images/products/almacenamiento/11.webp", "/images/products/almacenamiento/12.webp", "/images/products/almacenamiento/13.webp", "/images/products/almacenamiento/14.webp", "/images/products/almacenamiento/15.webp", "/images/products/almacenamiento/16.webp", "/images/products/almacenamiento/17.webp", "/images/products/almacenamiento/18.webp", "/images/products/almacenamiento/19.webp", "/images/products/almacenamiento/20.webp", "/images/products/almacenamiento/21.webp", "/images/products/almacenamiento/22.webp", "/images/products/almacenamiento/23.webp", "/images/products/almacenamiento/24.webp", "/images/products/almacenamiento/25.webp"],
},
  {
    slug: "silleria",
    nombre: "Sillería",
    descripcion:
      "Pasamos el 85% de nuestra vida laboral sentados; ofrecemos sillas ejecutivas, secretariales, de visita y bancas, en versiones tapizadas, de malla, plásticas, de aluminio y metálicas.",
    imagen: "/images/products/silleria-portada.webp",
    precioDesde: 1299,
    galeria: [
      "/images/products/silleria/01.webp",
      "/images/products/silleria/02.webp",
      "/images/products/silleria/03.webp"
    ],
    esNuevo: true,
  },
  {
    slug: "home",
    nombre: "Línea Home",
    descripcion:
      "Diseñamos cualquier tipo de mueble de hogar: recámaras, cocinas, centros de entretenimiento, cantinas, salas de descanso y más, con procesos de producción a la vanguardia.",
    imagen: "/images/products/home-portada.webp",
    precioDesde: 5999,
    galeria: ["/images/products/home/01.webp", "/images/products/home/02.webp", "/images/products/home/03.webp", "/images/products/home/04.webp", "/images/products/home/05.webp", "/images/products/home/06.webp", "/images/products/home/07.webp", "/images/products/home/08.webp", "/images/products/home/09.webp", "/images/products/home/10.webp", "/images/products/home/11.webp", "/images/products/home/12.webp", "/images/products/home/13.webp", "/images/products/home/14.webp", "/images/products/home/15.webp"],
  },
  {
    slug: "distribuciones",
    nombre: "Distribuciones",
    descripcion:
      "Estar al margen de las grandes empresas de este giro es nuestra misión; distribuimos productos de marcas reconocidas en el mercado nacional para brindar más opciones a nuestros clientes.",
    imagen: "/images/products/distribuciones-portada.webp",
    precioDesde: 2599,
    galeria: ["/images/products/distribuciones/01.webp", "/images/products/distribuciones/02.webp", "/images/products/distribuciones/03.webp", "/images/products/distribuciones/04.webp", "/images/products/distribuciones/05.webp", "/images/products/distribuciones/06.webp", "/images/products/distribuciones/07.webp", "/images/products/distribuciones/08.webp", "/images/products/distribuciones/09.webp", "/images/products/distribuciones/10.webp", "/images/products/distribuciones/11.webp", "/images/products/distribuciones/12.webp", "/images/products/distribuciones/13.webp", "/images/products/distribuciones/14.webp", "/images/products/distribuciones/15.webp", "/images/products/distribuciones/16.webp", "/images/products/distribuciones/17.webp", "/images/products/distribuciones/18.webp", "/images/products/distribuciones/19.webp", "/images/products/distribuciones/20.webp"],
  },
  {
    slug: "accesorios",
    nombre: "Accesorios",
    descripcion:
      "Toda oficina necesita espacios funcionales con las necesidades básicas para el máximo aprovechamiento del personal; tenemos una amplia gama de accesorios e insumos para oficina.",
    imagen: "/images/products/accesorios-portada.webp",
    precioDesde: 499,
    galeria: ["/images/products/accesorios/01.webp", "/images/products/accesorios/02.webp", "/images/products/accesorios/03.webp", "/images/products/accesorios/04.webp", "/images/products/accesorios/05.webp", "/images/products/accesorios/06.webp", "/images/products/accesorios/07.webp", "/images/products/accesorios/08.webp", "/images/products/accesorios/09.webp", "/images/products/accesorios/10.webp", "/images/products/accesorios/11.webp", "/images/products/accesorios/12.webp", "/images/products/accesorios/13.webp", "/images/products/accesorios/14.webp", "/images/products/accesorios/15.webp", "/images/products/accesorios/16.webp", "/images/products/accesorios/17.webp", "/images/products/accesorios/18.webp", "/images/products/accesorios/19.webp", "/images/products/accesorios/20.webp", "/images/products/accesorios/21.webp", "/images/products/accesorios/22.webp", "/images/products/accesorios/23.webp", "/images/products/accesorios/24.webp", "/images/products/accesorios/25.webp", "/images/products/accesorios/26.webp", "/images/products/accesorios/27.webp"],
  },
  {
    slug: "servicios",
    nombre: "Servicios",
    descripcion:
      "Grupo Gecotay es un grupo de empresas profesionales que engloba varios sectores; brindamos servicios de diferentes índoles siempre con el respaldo y la garantía de excelente servicio.",
    imagen: "/images/products/servicios-portada.webp",
    precioDesde: 999,
    galeria: ["/images/products/servicios/01.webp", "/images/products/servicios/02.webp", "/images/products/servicios/03.webp", "/images/products/servicios/04.webp", "/images/products/servicios/05.webp", "/images/products/servicios/06.webp", "/images/products/servicios/07.webp", "/images/products/servicios/08.webp", "/images/products/servicios/09.webp", "/images/products/servicios/10.webp", "/images/products/servicios/11.webp", "/images/products/servicios/12.webp"],
  },
];

export const FINISHES = {
  familias: [
    {
      slug: "telas",
      nombre: "Telas y tapices",
      descripcion:
        "Amplia variedad de telas para tapicería de mobiliario: desde opciones económicas hasta líneas premium.",
      imagen: "/images/finishes/telas.webp",
      muestras: [
        { nombre: "Kansas", imagenes: ["/images/finishes/telas/kansas/01.webp", "/images/finishes/telas/kansas/02.webp", "/images/finishes/telas/kansas/03.webp", "/images/finishes/telas/kansas/04.webp", "/images/finishes/telas/kansas/05.webp", "/images/finishes/telas/kansas/06.webp"] },
        { nombre: "Addison", imagenes: ["/images/finishes/telas/addison/01.webp", "/images/finishes/telas/addison/02.webp", "/images/finishes/telas/addison/03.webp", "/images/finishes/telas/addison/04.webp", "/images/finishes/telas/addison/05.webp", "/images/finishes/telas/addison/06.webp"] },
        { nombre: "Alessia", imagenes: ["/images/finishes/telas/alessia/01.webp", "/images/finishes/telas/alessia/02.webp", "/images/finishes/telas/alessia/03.webp", "/images/finishes/telas/alessia/04.webp", "/images/finishes/telas/alessia/05.webp", "/images/finishes/telas/alessia/06.webp"] },
        { nombre: "Cancún", imagenes: ["/images/finishes/telas/cancun/01.webp", "/images/finishes/telas/cancun/02.webp", "/images/finishes/telas/cancun/03.webp", "/images/finishes/telas/cancun/04.webp", "/images/finishes/telas/cancun/05.webp", "/images/finishes/telas/cancun/06.webp", "/images/finishes/telas/cancun/07.webp", "/images/finishes/telas/cancun/08.webp", "/images/finishes/telas/cancun/09.webp", "/images/finishes/telas/cancun/10.webp"] },
        { nombre: "Malla", imagenes: ["/images/finishes/telas/malla/01.webp", "/images/finishes/telas/malla/02.webp", "/images/finishes/telas/malla/03.webp", "/images/finishes/telas/malla/04.webp", "/images/finishes/telas/malla/05.webp", "/images/finishes/telas/malla/06.webp", "/images/finishes/telas/malla/07.webp", "/images/finishes/telas/malla/08.webp"] },
        { nombre: "Matisse", imagenes: ["/images/finishes/telas/matisse/01.webp", "/images/finishes/telas/matisse/02.webp"] },
        { nombre: "Micro espacial", imagenes: ["/images/finishes/telas/micro-espacial/01.webp", "/images/finishes/telas/micro-espacial/02.webp", "/images/finishes/telas/micro-espacial/03.webp", "/images/finishes/telas/micro-espacial/04.webp", "/images/finishes/telas/micro-espacial/05.webp", "/images/finishes/telas/micro-espacial/06.webp", "/images/finishes/telas/micro-espacial/07.webp", "/images/finishes/telas/micro-espacial/08.webp"] },
        { nombre: "Office", imagenes: ["/images/finishes/telas/office/01.webp", "/images/finishes/telas/office/02.webp", "/images/finishes/telas/office/03.webp", "/images/finishes/telas/office/04.webp", "/images/finishes/telas/office/05.webp", "/images/finishes/telas/office/06.webp", "/images/finishes/telas/office/07.webp", "/images/finishes/telas/office/08.webp", "/images/finishes/telas/office/09.webp", "/images/finishes/telas/office/10.webp"] },
        { nombre: "Olimpy", imagenes: ["/images/finishes/telas/olimpya/01.webp", "/images/finishes/telas/olimpya/02.webp", "/images/finishes/telas/olimpya/03.webp", "/images/finishes/telas/olimpya/04.webp", "/images/finishes/telas/olimpya/05.webp"] },
        { nombre: "Tactopiel", imagenes: ["/images/finishes/telas/tactopiel/01.webp", "/images/finishes/telas/tactopiel/02.webp", "/images/finishes/telas/tactopiel/03.webp", "/images/finishes/telas/tactopiel/04.webp", "/images/finishes/telas/tactopiel/05.webp", "/images/finishes/telas/tactopiel/06.webp", "/images/finishes/telas/tactopiel/07.webp"] },
      ],
    },
    {
      slug: "maderas",
      nombre: "Maderas y melaminas",
      descripcion:
        "Colores y texturas en melamina, MDF y madera natural para mobiliario de oficina y hogar.",
      imagen: "/images/finishes/maderas.webp",
      muestras: [
        { nombre: "Muestras de color", imagenes: ["/images/finishes/maderas/01.webp", "/images/finishes/maderas/02.webp", "/images/finishes/maderas/03.webp", "/images/finishes/maderas/04.webp", "/images/finishes/maderas/05.webp", "/images/finishes/maderas/06.webp", "/images/finishes/maderas/07.webp", "/images/finishes/maderas/08.webp", "/images/finishes/maderas/09.webp", "/images/finishes/maderas/10.webp", "/images/finishes/maderas/11.webp", "/images/finishes/maderas/12.webp", "/images/finishes/maderas/13.webp", "/images/finishes/maderas/14.webp", "/images/finishes/maderas/15.webp", "/images/finishes/maderas/16.webp", "/images/finishes/maderas/17.webp"] },
      ],
    },
    {
      slug: "metales",
      nombre: "Metales y lacados",
      descripcion:
        "Acabados metálicos y lacados en polvo para estructuras y mobiliario: cromo, pintura electrostática y más.",
      imagen: "/images/finishes/metales.webp",
      muestras: [
        { nombre: "Colores metálicos", imagenes: ["/images/finishes/metales/01.webp", "/images/finishes/metales/02.webp", "/images/finishes/metales/03.webp", "/images/finishes/metales/04.webp", "/images/finishes/metales/05.webp", "/images/finishes/metales/06.webp", "/images/finishes/metales/07.webp", "/images/finishes/metales/08.webp", "/images/finishes/metales/09.webp", "/images/finishes/metales/10.webp", "/images/finishes/metales/11.webp", "/images/finishes/metales/12.webp", "/images/finishes/metales/13.webp", "/images/finishes/metales/14.webp", "/images/finishes/metales/15.webp", "/images/finishes/metales/16.webp", "/images/finishes/metales/17.webp", "/images/finishes/metales/18.webp"] },
      ],
    },
    {
      slug: "superficies",
      nombre: "Superficies y mamparas",
      descripcion:
        "Mamparas y superficies divisorias para optimizar y personalizar tus espacios de trabajo.",
      imagen: "/images/finishes/superficies.webp",
      muestras: [
        { nombre: "Mamparas", imagenes: ["/images/finishes/superficies/01.webp", "/images/finishes/superficies/02.webp", "/images/finishes/superficies/03.webp", "/images/finishes/superficies/04.webp", "/images/finishes/superficies/05.webp"] },
      ],
    },
  ],
};

export const NAVEGACION = {
  principal: [
    { label: "Inicio", href: "/" },
    { label: "Productos", href: "/productos" },
    { label: "Servicios", href: "/servicios" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Acabados", href: "/acabados-tapices" },
    { label: "Contacto", href: "/contacto" },
  ],
  pie: [
    { label: "Productos", href: "/productos" },
    { label: "Servicios", href: "/servicios" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Acabados y tapices", href: "/acabados-tapices" },
    { label: "Cotizar", href: "/cotizar" },
    { label: "Descargas", href: "/descargas" },
    { label: "Contacto", href: "/contacto" },
    { label: "Aviso de privacidad", href: "/aviso-privacidad" },
  ],
  legal: [
    { label: "Aviso de privacidad", href: "/aviso-privacidad" },
    { label: "Políticas de venta", href: "/contacto#politicas" },
    { label: "Descargas", href: "/descargas" },
  ],
};