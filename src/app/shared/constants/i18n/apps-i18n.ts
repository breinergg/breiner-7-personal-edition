import { AppLanguage } from '../login-i18n';

export interface TechnologyRowCopy {
  category: string;
  technology: string;
  level: string;
  experience: string;
}

export interface DemoSlideCopy {
  src: string;
  alt: string;
  caption: string;
}

export interface MiHistoriaCopy {
  title: string;
  paragraphs: string[];
  signatureLine: string;
}

export interface ContactoCopy {
  sendMail: string;
  comingSoon: string;
  reply: string;
  forward: string;
  mail: string;
  contactInfo: string;
  inbox: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  portfolioVisitor: string;
  availableForContact: string;
  greeting: string;
  name: string;
  age: string;
  ageValue: string;
  institutionalEmail: string;
  personalEmail: string;
  phone: string;
  closing: string;
  sendToPersonal: string;
  writeInstitutional: string;
  mailSubject: string;
  mailBody: string;
}

export interface HabilidadesCopy {
  mainTechnologies: string;
  technologies: string;
  chartTitle: string;
  chartSubtitle: string;
  experience: string;
  sheetHabilidades: string;
  sheetTecnologias: string;
  columns: {
    category: string;
    technology: string;
    level: string;
    experience: string;
  };
  levels: {
    intermediate: string;
    intermediateAdvanced: string;
    basic: string;
  };
  categories: {
    language: string;
    framework: string;
    platform: string;
    database: string;
  };
  experienceValues: {
    sixMonths: string;
    oneYear: string;
    twoYears: string;
  };
  technologyRows: TechnologyRowCopy[];
}

export interface GaleriaCopy {
  organize: string;
  share: string;
  home: string;
  fix: string;
  slideshow: string;
  thumbnails: string;
  photosCount: string;
  photoTitles: string[];
}

export interface PapeleraCopy {
  menu: {
    file: string;
    edit: string;
    view: string;
    tools: string;
    help: string;
  };
  back: string;
  forward: string;
  up: string;
  emptyBin: string;
  restoreAll: string;
  address: string;
  recycleBin: string;
  bin: string;
  emptyTitle: string;
  emptyText: string;
  itemsCount: string;
}

export interface ExplorerCopy {
  menu: {
    file: string;
    edit: string;
    view: string;
    tools: string;
    help: string;
  };
  back: string;
  forward: string;
  up: string;
  address: string;
  favorites: string;
  desktop: string;
  projects: string;
  libraries: string;
  documents: string;
  images: string;
  computer: string;
  localDisk: string;
  localHardDrive: string;
  gbUsed: string;
  gbAvailable: string;
  gbAvailableOf: string;
  name: string;
  modified: string;
  type: string;
  size: string;
  emptyFolder: string;
  elements: string;
  oneSelected: string;
  searchIn: string;
  users: string;
  programFiles: string;
  programFilesX86: string;
  windows: string;
  perfLogs: string;
  locationLabels: {
    desktop: string;
    proyectos: string;
    documentos: string;
    imagenes: string;
    'disco-local': string;
  };
  fileTypes: {
    wordDocument: string;
    fileFolder: string;
    photoApp: string;
    systemMeter: string;
    excelDocument: string;
    pdfDocument: string;
    mailShortcut: string;
    recycleBin: string;
    webpFile: string;
  };
  explorerItemNames: Record<string, string>;
}

export interface WordCarouselCopy {
  prevImage: string;
  nextImage: string;
  enlarge: string;
  viewEnlarged: string;
  selectCapture: string;
  captureN: string;
  enlargedView: string;
  restoreSize: string;
  restore: string;
  demoImages: string;
  carouselAria: {
    gonzai: string;
    previdocs: string;
  };
}

export interface GonzaiCopy {
  bodyHtml: string;
  demoSlides: DemoSlideCopy[];
}

export interface PrevidocsCopy {
  bodyHtml: string;
  demoSlides: DemoSlideCopy[];
}

export interface AppsCopy {
  miHistoria: MiHistoriaCopy;
  contacto: ContactoCopy;
  habilidades: HabilidadesCopy;
  galeria: GaleriaCopy;
  papelera: PapeleraCopy;
  explorer: ExplorerCopy;
  wordCarousel: WordCarouselCopy;
  gonzai: GonzaiCopy;
  previdocs: PrevidocsCopy;
}

const GONZAI_DEMO_SLIDES: DemoSlideCopy[] = [
  { src: '/gonzai-imagenes/gg1.webp', alt: '', caption: '' },
  { src: '/gonzai-imagenes/gg2.webp', alt: '', caption: '' },
  { src: '/gonzai-imagenes/gg33.webp', alt: '', caption: '' },
  { src: '/gonzai-imagenes/gg4.webp', alt: '', caption: '' },
  { src: '/gonzai-imagenes/gg5.webp', alt: '', caption: '' }
];

const PREVIDOCS_DEMO_SLIDES: DemoSlideCopy[] = [
  { src: '/previdocs-imagenes/P1.webp', alt: '', caption: '' },
  { src: '/previdocs-imagenes/p2.webp', alt: '', caption: '' },
  { src: '/previdocs-imagenes/p3.webp', alt: '', caption: '' },
  { src: '/previdocs-imagenes/p4.webp', alt: '', caption: '' },
  { src: '/previdocs-imagenes/p5.webp', alt: '', caption: '' }
];

const TECHNOLOGY_NAMES = [
  'Java',
  'C#',
  'JavaScript',
  'Dart',
  'SQL',
  'HTML',
  'CSS',
  'C',
  'C++',
  'Spring Boot',
  'ASP.NET Core',
  'Angular',
  'Flutter',
  '.NET',
  'PostgreSQL'
] as const;

function buildTechnologyRows(
  categories: HabilidadesCopy['categories'],
  levels: HabilidadesCopy['levels'],
  experienceValues: HabilidadesCopy['experienceValues']
): TechnologyRowCopy[] {
  const { language, framework, platform, database } = categories;
  const { intermediate, intermediateAdvanced, basic } = levels;
  const { sixMonths, oneYear, twoYears } = experienceValues;

  return [
    { category: language, technology: TECHNOLOGY_NAMES[0], level: intermediate, experience: oneYear },
    { category: language, technology: TECHNOLOGY_NAMES[1], level: intermediateAdvanced, experience: oneYear },
    { category: language, technology: TECHNOLOGY_NAMES[2], level: intermediate, experience: twoYears },
    { category: language, technology: TECHNOLOGY_NAMES[3], level: intermediate, experience: sixMonths },
    { category: language, technology: TECHNOLOGY_NAMES[4], level: intermediate, experience: twoYears },
    { category: language, technology: TECHNOLOGY_NAMES[5], level: intermediate, experience: twoYears },
    { category: language, technology: TECHNOLOGY_NAMES[6], level: intermediate, experience: twoYears },
    { category: language, technology: TECHNOLOGY_NAMES[7], level: basic, experience: sixMonths },
    { category: language, technology: TECHNOLOGY_NAMES[8], level: basic, experience: oneYear },
    { category: framework, technology: TECHNOLOGY_NAMES[9], level: intermediate, experience: oneYear },
    { category: framework, technology: TECHNOLOGY_NAMES[10], level: intermediateAdvanced, experience: oneYear },
    { category: framework, technology: TECHNOLOGY_NAMES[11], level: intermediate, experience: sixMonths },
    { category: framework, technology: TECHNOLOGY_NAMES[12], level: intermediate, experience: sixMonths },
    { category: platform, technology: TECHNOLOGY_NAMES[13], level: intermediateAdvanced, experience: oneYear },
    { category: database, technology: TECHNOLOGY_NAMES[14], level: intermediate, experience: twoYears }
  ];
}

export const APPS_I18N: Record<AppLanguage, AppsCopy> = {
  ES: {
    miHistoria: {
      title: 'Mi Historia',
      paragraphs: [
        'Mi pasión por la tecnología comenzó con algo tan sencillo como un computador en casa. Recuerdo cuando mi padre compró aquel equipo que se convirtió en mucho más que una herramienta: fue la puerta de entrada a un mundo lleno de posibilidades. Entre videojuegos, búsquedas en internet, tareas escolares y horas de curiosidad frente a la pantalla, nació un interés que con el tiempo se transformó en una verdadera vocación.',
        'Aquellas experiencias despertaron en mí el deseo de comprender cómo funcionaban las computadoras, cómo se construían los programas y cómo la tecnología podía transformar la vida de las personas. Fue esa curiosidad la que me llevó a elegir Ingeniería de Sistemas como mi camino profesional.',
        'Hoy, después de cinco años de universidad, incontables horas de estudio, proyectos, errores, aciertos y grandes amistades, miro hacia atrás y entiendo que cada paso tuvo un propósito. Cada desafío superado me permitió desarrollar habilidades, adquirir conocimientos y crecer tanto profesional como personalmente.',
        'Esta página es el resultado de ese recorrido. No es solo un repositorio de proyectos, sino una representación de mi historia, de lo que he aprendido y de todo lo que aún me queda por descubrir. También es un homenaje a aquellos primeros momentos que despertaron mi pasión por la computación y una muestra de que, cuando la curiosidad se combina con esfuerzo, disciplina y dedicación, los sueños pueden convertirse en realidad.',
        'Bienvenido a mi historia, a mis proyectos y a una parte del camino que me ha convertido en quien soy hoy.'
      ],
      signatureLine: 'Con aprecio,'
    },
    contacto: {
      sendMail: 'Enviar correo',
      comingSoon: 'Próximamente',
      reply: 'Responder',
      forward: 'Reenviar',
      mail: 'Correo',
      contactInfo: 'Información de contacto',
      inbox: 'Bandeja de entrada',
      subject: 'Información de contacto — Breiner Gonzalez Machado',
      from: 'De:',
      to: 'Para:',
      date: 'Fecha:',
      portfolioVisitor: 'Visitante del portafolio',
      availableForContact: 'Disponible para contacto',
      greeting: '¡Hola! Gracias por visitar mi portafolio. Aquí tienes mis datos de contacto:',
      name: 'Nombre',
      age: 'Edad',
      ageValue: '22 años',
      institutionalEmail: 'Correo institucional',
      personalEmail: 'Correo personal',
      phone: 'Teléfono de contacto',
      closing:
        'Si deseas escribirme, usa el botón <strong>Enviar correo</strong> en la barra superior. Se abrirá tu aplicación de correo predeterminada con mi dirección personal lista para enviar el mensaje.',
      sendToPersonal: 'Enviar correo a {{email}}',
      writeInstitutional: 'Escribir al correo institucional',
      mailSubject: 'Contacto desde Breiner 7',
      mailBody: 'Hola Breiner,\n\n'
    },
    habilidades: {
      mainTechnologies: 'Tecnologías principales',
      technologies: 'Tecnologías',
      chartTitle: 'Tecnologías principales',
      chartSubtitle: 'Áreas en las que he desarrollado proyectos y adquirido experiencia.',
      experience: 'Experiencia',
      sheetHabilidades: 'Habilidades',
      sheetTecnologias: 'Tecnologías',
      columns: {
        category: 'Categoría',
        technology: 'Tecnología',
        level: 'Nivel',
        experience: 'Experiencia'
      },
      levels: {
        intermediate: 'Intermedio',
        intermediateAdvanced: 'Intermedio Avanzado',
        basic: 'Básico'
      },
      categories: {
        language: 'Lenguaje',
        framework: 'Framework',
        platform: 'Plataforma',
        database: 'Base de Datos'
      },
      experienceValues: {
        sixMonths: '6 meses',
        oneYear: '1 año',
        twoYears: '2 años'
      },
      technologyRows: buildTechnologyRows(
        {
          language: 'Lenguaje',
          framework: 'Framework',
          platform: 'Plataforma',
          database: 'Base de Datos'
        },
        {
          intermediate: 'Intermedio',
          intermediateAdvanced: 'Intermedio Avanzado',
          basic: 'Básico'
        },
        {
          sixMonths: '6 meses',
          oneYear: '1 año',
          twoYears: '2 años'
        }
      )
    },
    galeria: {
      organize: 'Organizar',
      share: 'Compartir',
      home: 'Inicio',
      fix: 'Corregir',
      slideshow: 'Presentación',
      thumbnails: 'Miniaturas',
      photosCount: '{{count}} fotos',
      photoTitles: [
        'Semillero GIDSYC',
        'Evento de Tech',
        'Diplomado en Liderazgo Transformacional',
        'Primer día de Prácticas Profesionales',
        'Voluntario en Unimagdalena',
        'Amigos',
        'El Team A',
        'Inicios en la U'
      ]
    },
    papelera: {
      menu: {
        file: 'Archivo',
        edit: 'Editar',
        view: 'Ver',
        tools: 'Herramientas',
        help: 'Ayuda'
      },
      back: 'Atrás',
      forward: 'Adelante',
      up: 'Subir',
      emptyBin: 'Vaciar la papelera',
      restoreAll: 'Restaurar todos los elementos',
      address: 'Dirección:',
      recycleBin: 'Papelera de reciclaje',
      bin: 'Papelera',
      emptyTitle: 'La papelera de reciclaje está vacía.',
      emptyText: 'No hay archivos en la papelera de reciclaje.',
      itemsCount: '{{count}} elementos'
    },
    explorer: {
      menu: {
        file: 'Archivo',
        edit: 'Editar',
        view: 'Ver',
        tools: 'Herramientas',
        help: 'Ayuda'
      },
      back: 'Atrás',
      forward: 'Adelante',
      up: 'Subir',
      address: 'Dirección:',
      favorites: 'Favoritos',
      desktop: 'Escritorio',
      projects: 'Proyectos FullStack',
      libraries: 'Bibliotecas',
      documents: 'Documentos',
      images: 'Imágenes',
      computer: 'Equipo',
      localDisk: 'Disco local (C:)',
      localHardDrive: 'Disco duro local',
      gbUsed: '{{used}} GB usados de {{total}} GB',
      gbAvailable: '{{free}} GB disponibles',
      gbAvailableOf: '{{free}} GB disponibles de {{total}} GB',
      name: 'Nombre',
      modified: 'Fecha de modificación',
      type: 'Tipo',
      size: 'Tamaño',
      emptyFolder: 'Esta carpeta está vacía.',
      elements: '{{count}} elementos',
      oneSelected: '1 elemento seleccionado',
      searchIn: 'Buscar en {{folder}}',
      users: 'Usuarios',
      programFiles: 'Archivos de programa',
      programFilesX86: 'Archivos de programa (x86)',
      windows: 'Windows',
      perfLogs: 'PerfLogs',
      locationLabels: {
        desktop: 'Escritorio',
        proyectos: 'Proyectos FullStack',
        documentos: 'Documentos',
        imagenes: 'Imágenes',
        'disco-local': 'Disco local (C:)'
      },
      fileTypes: {
        wordDocument: 'Documento de Word',
        fileFolder: 'Carpeta de archivos',
        photoApp: 'Aplicación de fotos',
        systemMeter: 'Medidor del sistema',
        excelDocument: 'Documento de Excel',
        pdfDocument: 'Documento PDF',
        mailShortcut: 'Acceso directo de correo',
        recycleBin: 'Papelera de reciclaje',
        webpFile: 'Archivo WebP'
      },
      explorerItemNames: {
        historia: 'Mi Historia.docx',
        'proyectos-folder': 'Proyectos FullStack',
        galeria: 'Galería',
        gadget: 'Gadget',
        habilidades: 'Habilidades.xlsx',
        'hoja-vida': 'Hoja de Vida.pdf',
        contacto: 'Contacto',
        papelera: 'Papelera de reciclaje',
        previdocs: 'PreviDocs.docx',
        gonzai: 'Gonzai.docx',
        'img-semillero': 'semillero.webp',
        'img-evento': 'evento-ingenieria.webp',
        'img-diplomado': 'diplomado-liderazgo.webp',
        'img-practicas': '1er-dia-practicas.webp',
        'img-voluntario': 'voluntario.webp',
        'img-amigos': 'amigos-del-alma.webp',
        'img-team-a': 'EL-TEAM-A.webp',
        'img-inicios': 'inicios-en-la-u.webp',
        'c-usuarios': 'Usuarios',
        'c-program-files': 'Archivos de programa',
        'c-program-files-x86': 'Archivos de programa (x86)',
        'c-windows': 'Windows',
        'c-perflogs': 'PerfLogs'
      }
    },
    wordCarousel: {
      prevImage: 'Imagen anterior',
      nextImage: 'Imagen siguiente',
      enlarge: 'Ampliar imagen',
      viewEnlarged: 'Ver imagen ampliada',
      selectCapture: 'Seleccionar captura',
      captureN: 'Captura {{n}}',
      enlargedView: 'Vista ampliada — Captura {{n}}',
      restoreSize: 'Restaurar tamaño normal',
      restore: 'Restaurar',
      demoImages: 'Imágenes de demostración',
      carouselAria: {
        gonzai: 'Carrusel de capturas de GonzAI',
        previdocs: 'Carrusel de capturas de PreviDocs'
      }
    },
    gonzai: {
      bodyHtml: `<h1 class="word-title">GonzAI — Sistema Inteligente de Gestión Empresarial</h1>

<h2 class="word-heading">Descripción General</h2>
<p>
  GonzAI es una plataforma web integral diseñada para optimizar y automatizar los procesos operativos
  de un negocio. Funciona como un sistema centralizado de gestión de ventas, control de inventario y
  administración de cartera de clientes, con el valor añadido de integrar asistencia basada en
  Inteligencia Artificial. La aplicación permite a los administradores tomar decisiones informadas a
  través de paneles de control estadísticos (dashboards) y mantener un registro exacto de cada
  movimiento financiero y logístico.
</p>

<h2 class="word-heading">Características Principales</h2>
<ul class="word-list">
  <li>
    <strong>Gestión de Ventas e Inventario:</strong> Módulo completo para el registro de ventas
    diarias y control en tiempo real de los niveles de stock, incluyendo un historial detallado de
    los movimientos de inventario y categorización de productos.
  </li>
  <li>
    <strong>Administración de Clientes y Cartera:</strong> Sistema de seguimiento de clientes que
    permite registrar movimientos, abonos y calcular saldos pendientes, identificando rápidamente a
    los clientes con mayor deuda.
  </li>
  <li>
    <strong>Asistente Inteligente (GonzAI):</strong> Integración de funcionalidades de IA con
    registro de interacciones (ChatLogs) y capacidad para capturar y procesar preguntas no
    reconocidas, mejorando continuamente la asistencia al usuario.
  </li>
  <li>
    <strong>Seguridad y Control de Acceso:</strong> Sistema de autenticación robusto para proteger
    la información sensible del negocio y restringir el acceso a usuarios no autorizados.
  </li>
</ul>

<h2 class="word-heading">Arquitectura y Tecnologías (Stack Tecnológico)</h2>
<p>
  El proyecto fue desarrollado utilizando una arquitectura moderna de cliente-servidor, separando
  claramente las responsabilidades del frontend y el backend para asegurar la escalabilidad y el
  mantenimiento del código.
</p>

<h3 class="word-subheading">Frontend (Client-Side)</h3>
<ul class="word-list">
  <li>
    <strong>Framework:</strong> Desarrollado como una Single Page Application (SPA) utilizando
    Angular.
  </li>
  <li>
    <strong>Arquitectura:</strong> Diseño modular basado en componentes con servicios inyectables
    para el consumo de la API.
  </li>
  <li>
    <strong>Seguridad:</strong> Implementación de Auth Guards para la protección de rutas y HTTP
    Interceptors para la gestión y envío seguro de tokens de sesión.
  </li>
  <li>
    <strong>UI/UX:</strong> Interfaz responsiva e intuitiva, estructurada con un diseño de layout
    maestro para la navegación entre los distintos módulos.
  </li>
</ul>

<h3 class="word-subheading">Backend (Server-Side)</h3>
<ul class="word-list">
  <li>
    <strong>Framework:</strong> API RESTful construida con C# y ASP.NET Core 8.
  </li>
  <li>
    <strong>Patrones de Diseño:</strong> Arquitectura en capas (Controladores, Servicios y Acceso a
    Datos) para desacoplar la lógica de negocio. Uso intensivo de DTOs (Data Transfer Objects)
    implementados mediante Mapster para optimizar el envío de datos y proteger las entidades de la
    base de datos.
  </li>
  <li>
    <strong>Base de Datos:</strong> Persistencia de datos gestionada a través de Entity Framework
    Core utilizando PostgreSQL (mediante Npgsql), garantizando integridad referencial y consultas
    eficientes.
  </li>
  <li>
    <strong>Autenticación:</strong> Seguridad implementada con JWT (JSON Web Tokens) e integración
    de encriptación de contraseñas (BCrypt).
  </li>
</ul>

<h2 class="word-heading word-heading--carousel">Imágenes de demostración</h2>
<p class="word-carousel-intro">
  A continuación se presenta una selección de capturas representativas de la interfaz de GonzAI,
  ilustrando los módulos principales, la experiencia de usuario y las capacidades analíticas del
  sistema en un entorno de producción.
</p>`,
      demoSlides: [
        {
          src: GONZAI_DEMO_SLIDES[0].src,
          alt: 'Vista general del panel principal de GonzAI',
          caption: 'Panel principal con acceso centralizado a los módulos del sistema.'
        },
        {
          src: GONZAI_DEMO_SLIDES[1].src,
          alt: 'Módulo de gestión de ventas e inventario',
          caption: 'Registro de ventas y control de stock en tiempo real.'
        },
        {
          src: GONZAI_DEMO_SLIDES[2].src,
          alt: 'Administración de clientes y cartera',
          caption: 'Seguimiento de clientes, abonos y saldos pendientes.'
        },
        {
          src: GONZAI_DEMO_SLIDES[3].src,
          alt: 'Asistente inteligente GonzAI',
          caption: 'Interfaz del asistente con IA integrada para consultas operativas.'
        },
        {
          src: GONZAI_DEMO_SLIDES[4].src,
          alt: 'Dashboard estadístico de GonzAI',
          caption: 'Indicadores y métricas para la toma de decisiones informadas.'
        }
      ]
    },
    previdocs: {
      bodyHtml: `<h1 class="word-title">PreviDocs — Sistema Especializado de Gestión de Historias Clínicas</h1>

<h2 class="word-heading">Descripción General</h2>
<p>
  PreviDocs es un sistema integral de gestión de historias clínicas diseñado específicamente para
  instituciones de salud mental y psicología clínica. Esta aplicación web cliente-servidor optimiza el
  registro, seguimiento y consulta de información médica, abarcando desde los datos de pacientes hasta
  las sesiones terapéuticas y las evoluciones clínicas o familiares. Además, agiliza los procesos
  administrativos e informativos mediante la generación automatizada de reportes detallados en formato
  PDF.
</p>

<h2 class="word-heading">Características Principales</h2>
<ul class="word-list">
  <li>
    <strong>Gestión de Pacientes e Historias Clínicas:</strong> Sistema avanzado de búsqueda
    inteligente que integra bases de datos locales y externas (como sistemas de enfermería),
    permitiendo la creación de historias clínicas mediante formularios exhaustivos que documentan
    diagnósticos, antecedentes y planes de tratamiento.
  </li>
  <li>
    <strong>Seguimiento de Sesiones y Evoluciones:</strong> Módulo dedicado para registrar sesiones
    terapéuticas con numeración secuencial automática, así como el seguimiento de la evolución clínica
    de cada paciente por sesión. Incluye autocompletado dinámico de diagnósticos y profesionales
    consultando un catálogo externo.
  </li>
  <li>
    <strong>Generación de Reportes y Dashboard:</strong> Capacidad para generar documentos PDF
    multipágina completos que incluyen desde el diagrama familiar hasta la impresión diagnóstica y la
    firma digital. El sistema también cuenta con un panel de control interactivo (Dashboard) con
    animaciones de métricas en tiempo real sobre pacientes, historias y sesiones totales.
  </li>
  <li>
    <strong>Seguridad y Control de Acceso:</strong> Implementación de un esquema de seguridad mediante
    tokens JWT con expiración. Cuenta con protección de rutas en el cliente y control de acceso basado
    en roles específicos (Administrador, Médico, Facturador) para garantizar la confidencialidad de la
    información clínica.
  </li>
</ul>

<h2 class="word-heading">Arquitectura y Tecnologías (Stack Tecnológico)</h2>
<p>
  El proyecto fue construido bajo una arquitectura robusta de dos capas, garantizando la escalabilidad,
  separación de responsabilidades y el bajo acoplamiento mediante inyección de dependencias.
</p>

<h3 class="word-subheading">Frontend (Client-Side)</h3>
<ul class="word-list">
  <li>
    <strong>Framework:</strong> Desarrollado como una Single Page Application (SPA) con Angular 19.2
    utilizando Standalone Components.
  </li>
  <li>
    <strong>Arquitectura y Estado:</strong> Diseño modular jerárquico basado en páginas/componentes, con
    gestión de estado reactiva apoyada en RxJS para la sesión de usuario.
  </li>
  <li>
    <strong>Seguridad:</strong> Uso de guards funcionales para proteger el acceso a rutas privadas y un
    interceptor HTTP que inyecta automáticamente los tokens JWT en cada petición.
  </li>
  <li>
    <strong>UI/UX:</strong> Interfaz fluida con formularios reactivos, validaciones, paginación del lado
    del cliente, filtros dinámicos y autocompletado optimizado con debounce para no saturar el servidor.
  </li>
</ul>

<h3 class="word-subheading">Backend (Server-Side)</h3>
<ul class="word-list">
  <li>
    <strong>Framework:</strong> API REST de alto rendimiento construida con ASP.NET Core 8.0 y C# 12.
  </li>
  <li>
    <strong>Patrones de Diseño:</strong> Arquitectura fuertemente tipada estructurada en capas
    (Controladores, Servicios y Repositorios), complementada con el uso extensivo de DTOs (mapeados
    mediante Mapster) para gestionar eficientemente las transferencias de datos.
  </li>
  <li>
    <strong>Base de Datos y ORM:</strong> Persistencia implementada sobre una base de datos relacional
    Firebird, utilizando Dapper como micro-ORM para ejecutar consultas SQL directas y de gran velocidad.
  </li>
</ul>

<h2 class="word-heading word-heading--carousel">Imágenes de demostración</h2>
<p class="word-carousel-intro">
  A continuación se presenta una selección de capturas representativas de la interfaz de PreviDocs,
  ilustrando el dashboard clínico, la gestión de historias, el seguimiento de sesiones y la generación
  de reportes en un entorno de producción.
</p>`,
      demoSlides: [
        {
          src: PREVIDOCS_DEMO_SLIDES[0].src,
          alt: 'Panel principal y dashboard de PreviDocs',
          caption: 'Dashboard interactivo con métricas en tiempo real de pacientes, historias y sesiones.'
        },
        {
          src: PREVIDOCS_DEMO_SLIDES[1].src,
          alt: 'Gestión de pacientes e historias clínicas',
          caption:
            'Formularios exhaustivos para registro de historias clínicas, diagnósticos y planes de tratamiento.'
        },
        {
          src: PREVIDOCS_DEMO_SLIDES[2].src,
          alt: 'Seguimiento de sesiones terapéuticas',
          caption: 'Registro secuencial de sesiones con evolución clínica y autocompletado de diagnósticos.'
        },
        {
          src: PREVIDOCS_DEMO_SLIDES[3].src,
          alt: 'Generación de reportes PDF',
          caption: 'Reportes multipágina con diagrama familiar, impresión diagnóstica y firma digital.'
        },
        {
          src: PREVIDOCS_DEMO_SLIDES[4].src,
          alt: 'Interfaz de consulta y búsqueda inteligente',
          caption: 'Búsqueda integrada en bases locales y externas para agilizar la consulta clínica.'
        }
      ]
    }
  },
  EN: {
    miHistoria: {
      title: 'My Story',
      paragraphs: [
        'My passion for technology began with something as simple as a computer at home. I remember when my father bought that machine that became much more than a tool: it was the gateway to a world full of possibilities. Between video games, internet searches, school assignments, and hours of curiosity in front of the screen, an interest was born that over time became a true vocation.',
        'Those experiences awakened in me the desire to understand how computers worked, how programs were built, and how technology could transform people\'s lives. It was that curiosity that led me to choose Systems Engineering as my professional path.',
        'Today, after five years of university, countless hours of study, projects, mistakes, successes, and great friendships, I look back and understand that every step had a purpose. Every challenge overcome allowed me to develop skills, acquire knowledge, and grow both professionally and personally.',
        'This page is the result of that journey. It is not just a repository of projects, but a representation of my story, what I have learned, and everything I still have left to discover. It is also a tribute to those first moments that sparked my passion for computing and proof that when curiosity is combined with effort, discipline, and dedication, dreams can become reality.',
        'Welcome to my story, my projects, and a part of the path that has made me who I am today.'
      ],
      signatureLine: 'With appreciation,'
    },
    contacto: {
      sendMail: 'Send mail',
      comingSoon: 'Coming soon',
      reply: 'Reply',
      forward: 'Forward',
      mail: 'Mail',
      contactInfo: 'Contact information',
      inbox: 'Inbox',
      subject: 'Contact information — Breiner Gonzalez Machado',
      from: 'From:',
      to: 'To:',
      date: 'Date:',
      portfolioVisitor: 'Portfolio visitor',
      availableForContact: 'Available for contact',
      greeting: 'Hello! Thank you for visiting my portfolio. Here is my contact information:',
      name: 'Name',
      age: 'Age',
      ageValue: '22 years old',
      institutionalEmail: 'Institutional email',
      personalEmail: 'Personal email',
      phone: 'Contact phone',
      closing:
        'If you would like to write to me, use the <strong>Send mail</strong> button in the top toolbar. Your default mail application will open with my personal address ready to send the message.',
      sendToPersonal: 'Send mail to {{email}}',
      writeInstitutional: 'Write to institutional email',
      mailSubject: 'Contact from Breiner 7',
      mailBody: 'Hi Breiner,\n\n'
    },
    habilidades: {
      mainTechnologies: 'Main technologies',
      technologies: 'Technologies',
      chartTitle: 'Main technologies',
      chartSubtitle: 'Areas in which I have developed projects and gained experience.',
      experience: 'Experience',
      sheetHabilidades: 'Skills',
      sheetTecnologias: 'Technologies',
      columns: {
        category: 'Category',
        technology: 'Technology',
        level: 'Level',
        experience: 'Experience'
      },
      levels: {
        intermediate: 'Intermediate',
        intermediateAdvanced: 'Intermediate Advanced',
        basic: 'Basic'
      },
      categories: {
        language: 'Language',
        framework: 'Framework',
        platform: 'Platform',
        database: 'Database'
      },
      experienceValues: {
        sixMonths: '6 months',
        oneYear: '1 year',
        twoYears: '2 years'
      },
      technologyRows: buildTechnologyRows(
        {
          language: 'Language',
          framework: 'Framework',
          platform: 'Platform',
          database: 'Database'
        },
        {
          intermediate: 'Intermediate',
          intermediateAdvanced: 'Intermediate Advanced',
          basic: 'Basic'
        },
        {
          sixMonths: '6 months',
          oneYear: '1 year',
          twoYears: '2 years'
        }
      )
    },
    galeria: {
      organize: 'Organize',
      share: 'Share',
      home: 'Home',
      fix: 'Fix',
      slideshow: 'Slideshow',
      thumbnails: 'Thumbnails',
      photosCount: '{{count}} photos',
      photoTitles: [
        'GIDSYC Research Group',
        'Tech Event',
        'Diploma in Transformational Leadership',
        'First Day of Professional Internship',
        'Volunteer at Unimagdalena',
        'Friends',
        'Team A',
        'Starting at University'
      ]
    },
    papelera: {
      menu: {
        file: 'File',
        edit: 'Edit',
        view: 'View',
        tools: 'Tools',
        help: 'Help'
      },
      back: 'Back',
      forward: 'Forward',
      up: 'Up',
      emptyBin: 'Empty Recycle Bin',
      restoreAll: 'Restore all items',
      address: 'Address:',
      recycleBin: 'Recycle Bin',
      bin: 'Bin',
      emptyTitle: 'The Recycle Bin is empty.',
      emptyText: 'There are no files in the Recycle Bin.',
      itemsCount: '{{count}} items'
    },
    explorer: {
      menu: {
        file: 'File',
        edit: 'Edit',
        view: 'View',
        tools: 'Tools',
        help: 'Help'
      },
      back: 'Back',
      forward: 'Forward',
      up: 'Up',
      address: 'Address:',
      favorites: 'Favorites',
      desktop: 'Desktop',
      projects: 'FullStack Projects',
      libraries: 'Libraries',
      documents: 'Documents',
      images: 'Pictures',
      computer: 'Computer',
      localDisk: 'Local Disk (C:)',
      localHardDrive: 'Local hard drive',
      gbUsed: '{{used}} GB used of {{total}} GB',
      gbAvailable: '{{free}} GB available',
      gbAvailableOf: '{{free}} GB available of {{total}} GB',
      name: 'Name',
      modified: 'Date modified',
      type: 'Type',
      size: 'Size',
      emptyFolder: 'This folder is empty.',
      elements: '{{count}} items',
      oneSelected: '1 item selected',
      searchIn: 'Search in {{folder}}',
      users: 'Users',
      programFiles: 'Program Files',
      programFilesX86: 'Program Files (x86)',
      windows: 'Windows',
      perfLogs: 'PerfLogs',
      locationLabels: {
        desktop: 'Desktop',
        proyectos: 'FullStack Projects',
        documentos: 'Documents',
        imagenes: 'Pictures',
        'disco-local': 'Local Disk (C:)'
      },
      fileTypes: {
        wordDocument: 'Word Document',
        fileFolder: 'File folder',
        photoApp: 'Photo application',
        systemMeter: 'System meter',
        excelDocument: 'Excel Document',
        pdfDocument: 'PDF Document',
        mailShortcut: 'Mail shortcut',
        recycleBin: 'Recycle Bin',
        webpFile: 'WebP File'
      },
      explorerItemNames: {
        historia: 'My Story.docx',
        'proyectos-folder': 'FullStack Projects',
        galeria: 'Gallery',
        gadget: 'Gadget',
        habilidades: 'Skills.xlsx',
        'hoja-vida': 'Resume.pdf',
        contacto: 'Contact',
        papelera: 'Recycle Bin',
        previdocs: 'PreviDocs.docx',
        gonzai: 'Gonzai.docx',
        'img-semillero': 'semillero.webp',
        'img-evento': 'evento-ingenieria.webp',
        'img-diplomado': 'diplomado-liderazgo.webp',
        'img-practicas': '1er-dia-practicas.webp',
        'img-voluntario': 'voluntario.webp',
        'img-amigos': 'amigos-del-alma.webp',
        'img-team-a': 'EL-TEAM-A.webp',
        'img-inicios': 'inicios-en-la-u.webp',
        'c-usuarios': 'Users',
        'c-program-files': 'Program Files',
        'c-program-files-x86': 'Program Files (x86)',
        'c-windows': 'Windows',
        'c-perflogs': 'PerfLogs'
      }
    },
    wordCarousel: {
      prevImage: 'Previous image',
      nextImage: 'Next image',
      enlarge: 'Enlarge image',
      viewEnlarged: 'View enlarged image',
      selectCapture: 'Select capture',
      captureN: 'Capture {{n}}',
      enlargedView: 'Enlarged view — Capture {{n}}',
      restoreSize: 'Restore normal size',
      restore: 'Restore',
      demoImages: 'Demo images',
      carouselAria: {
        gonzai: 'GonzAI screenshot carousel',
        previdocs: 'PreviDocs screenshot carousel'
      }
    },
    gonzai: {
      bodyHtml: `<h1 class="word-title">GonzAI — Intelligent Business Management System</h1>

<h2 class="word-heading">Overview</h2>
<p>
  GonzAI is a comprehensive web platform designed to optimize and automate a business's operational
  processes. It serves as a centralized system for sales management, inventory control, and customer
  portfolio administration, with the added value of integrated Artificial Intelligence assistance. The
  application enables administrators to make informed decisions through statistical dashboards and
  maintain an accurate record of every financial and logistical movement.
</p>

<h2 class="word-heading">Key Features</h2>
<ul class="word-list">
  <li>
    <strong>Sales and Inventory Management:</strong> Complete module for daily sales recording and
    real-time stock level control, including a detailed history of inventory movements and product
    categorization.
  </li>
  <li>
    <strong>Customer and Portfolio Administration:</strong> Customer tracking system that records
    movements, payments, and calculates outstanding balances, quickly identifying customers with the
    highest debt.
  </li>
  <li>
    <strong>Intelligent Assistant (GonzAI):</strong> Integration of AI capabilities with interaction
    logging (ChatLogs) and the ability to capture and process unrecognized questions, continuously
    improving user assistance.
  </li>
  <li>
    <strong>Security and Access Control:</strong> Robust authentication system to protect sensitive
    business information and restrict access to unauthorized users.
  </li>
</ul>

<h2 class="word-heading">Architecture and Technologies (Tech Stack)</h2>
<p>
  The project was developed using a modern client-server architecture, clearly separating frontend and
  backend responsibilities to ensure scalability and maintainability.
</p>

<h3 class="word-subheading">Frontend (Client-Side)</h3>
<ul class="word-list">
  <li>
    <strong>Framework:</strong> Built as a Single Page Application (SPA) using Angular.
  </li>
  <li>
    <strong>Architecture:</strong> Modular component-based design with injectable services for API
    consumption.
  </li>
  <li>
    <strong>Security:</strong> Auth Guards for route protection and HTTP Interceptors for secure session
    token management and transmission.
  </li>
  <li>
    <strong>UI/UX:</strong> Responsive and intuitive interface structured with a master layout design for
    navigation between modules.
  </li>
</ul>

<h3 class="word-subheading">Backend (Server-Side)</h3>
<ul class="word-list">
  <li>
    <strong>Framework:</strong> RESTful API built with C# and ASP.NET Core 8.
  </li>
  <li>
    <strong>Design Patterns:</strong> Layered architecture (Controllers, Services, and Data Access) to
    decouple business logic. Extensive use of DTOs (Data Transfer Objects) implemented with Mapster to
    optimize data transfer and protect database entities.
  </li>
  <li>
    <strong>Database:</strong> Data persistence managed through Entity Framework Core using PostgreSQL
    (via Npgsql), ensuring referential integrity and efficient queries.
  </li>
  <li>
    <strong>Authentication:</strong> Security implemented with JWT (JSON Web Tokens) and password
    encryption (BCrypt).
  </li>
</ul>

<h2 class="word-heading word-heading--carousel">Demo images</h2>
<p class="word-carousel-intro">
  Below is a selection of representative screenshots of the GonzAI interface, illustrating the main
  modules, user experience, and analytical capabilities of the system in a production environment.
</p>`,
      demoSlides: [
        {
          src: GONZAI_DEMO_SLIDES[0].src,
          alt: 'GonzAI main dashboard overview',
          caption: 'Main dashboard with centralized access to system modules.'
        },
        {
          src: GONZAI_DEMO_SLIDES[1].src,
          alt: 'Sales and inventory management module',
          caption: 'Sales recording and real-time stock control.'
        },
        {
          src: GONZAI_DEMO_SLIDES[2].src,
          alt: 'Customer and portfolio administration',
          caption: 'Customer tracking, payments, and outstanding balances.'
        },
        {
          src: GONZAI_DEMO_SLIDES[3].src,
          alt: 'GonzAI intelligent assistant',
          caption: 'Assistant interface with integrated AI for operational queries.'
        },
        {
          src: GONZAI_DEMO_SLIDES[4].src,
          alt: 'GonzAI statistical dashboard',
          caption: 'Indicators and metrics for informed decision-making.'
        }
      ]
    },
    previdocs: {
      bodyHtml: `<h1 class="word-title">PreviDocs — Specialized Clinical Records Management System</h1>

<h2 class="word-heading">Overview</h2>
<p>
  PreviDocs is a comprehensive clinical records management system designed specifically for mental health
  institutions and clinical psychology. This client-server web application optimizes the registration,
  tracking, and consultation of medical information, covering everything from patient data to therapeutic
  sessions and clinical or family progress notes. It also streamlines administrative and reporting
  processes through automated generation of detailed PDF reports.
</p>

<h2 class="word-heading">Key Features</h2>
<ul class="word-list">
  <li>
    <strong>Patient and Clinical Records Management:</strong> Advanced intelligent search system that
    integrates local and external databases (such as nursing systems), enabling creation of clinical
    records through comprehensive forms documenting diagnoses, history, and treatment plans.
  </li>
  <li>
    <strong>Session and Progress Tracking:</strong> Dedicated module for recording therapeutic sessions
    with automatic sequential numbering, as well as tracking each patient's clinical progress per session.
    Includes dynamic autocomplete for diagnoses and professionals from an external catalog.
  </li>
  <li>
    <strong>Report Generation and Dashboard:</strong> Ability to generate complete multi-page PDF documents
    including family diagrams, diagnostic impressions, and digital signatures. The system also features an
    interactive dashboard with real-time metric animations for patients, records, and total sessions.
  </li>
  <li>
    <strong>Security and Access Control:</strong> Security scheme implemented with expiring JWT tokens.
    Includes client-side route protection and role-based access control (Administrator, Physician,
    Billing) to ensure clinical information confidentiality.
  </li>
</ul>

<h2 class="word-heading">Architecture and Technologies (Tech Stack)</h2>
<p>
  The project was built on a robust two-tier architecture, ensuring scalability, separation of
  responsibilities, and low coupling through dependency injection.
</p>

<h3 class="word-subheading">Frontend (Client-Side)</h3>
<ul class="word-list">
  <li>
    <strong>Framework:</strong> Built as a Single Page Application (SPA) with Angular 19.2 using Standalone
    Components.
  </li>
  <li>
    <strong>Architecture and State:</strong> Hierarchical modular design based on pages/components, with
    reactive state management supported by RxJS for the user session.
  </li>
  <li>
    <strong>Security:</strong> Functional guards to protect access to private routes and an HTTP interceptor
    that automatically injects JWT tokens into every request.
  </li>
  <li>
    <strong>UI/UX:</strong> Fluid interface with reactive forms, validations, client-side pagination,
    dynamic filters, and autocomplete optimized with debounce to avoid overloading the server.
  </li>
</ul>

<h3 class="word-subheading">Backend (Server-Side)</h3>
<ul class="word-list">
  <li>
    <strong>Framework:</strong> High-performance REST API built with ASP.NET Core 8.0 and C# 12.
  </li>
  <li>
    <strong>Design Patterns:</strong> Strongly typed layered architecture (Controllers, Services, and
    Repositories), complemented by extensive use of DTOs (mapped with Mapster) to efficiently manage data
    transfers.
  </li>
  <li>
    <strong>Database and ORM:</strong> Persistence implemented on a Firebird relational database, using
    Dapper as a micro-ORM to execute direct, high-speed SQL queries.
  </li>
</ul>

<h2 class="word-heading word-heading--carousel">Demo images</h2>
<p class="word-carousel-intro">
  Below is a selection of representative screenshots of the PreviDocs interface, illustrating the clinical
  dashboard, records management, session tracking, and report generation in a production environment.
</p>`,
      demoSlides: [
        {
          src: PREVIDOCS_DEMO_SLIDES[0].src,
          alt: 'PreviDocs main panel and dashboard',
          caption: 'Interactive dashboard with real-time metrics for patients, records, and sessions.'
        },
        {
          src: PREVIDOCS_DEMO_SLIDES[1].src,
          alt: 'Patient and clinical records management',
          caption: 'Comprehensive forms for clinical records, diagnoses, and treatment plans.'
        },
        {
          src: PREVIDOCS_DEMO_SLIDES[2].src,
          alt: 'Therapeutic session tracking',
          caption: 'Sequential session recording with clinical progress and diagnosis autocomplete.'
        },
        {
          src: PREVIDOCS_DEMO_SLIDES[3].src,
          alt: 'PDF report generation',
          caption: 'Multi-page reports with family diagram, diagnostic impression, and digital signature.'
        },
        {
          src: PREVIDOCS_DEMO_SLIDES[4].src,
          alt: 'Query interface and intelligent search',
          caption: 'Integrated search across local and external databases to streamline clinical consultation.'
        }
      ]
    }
  }
};
