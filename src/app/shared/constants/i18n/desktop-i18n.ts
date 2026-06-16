import { AppLanguage } from '../login-i18n';

export interface DesktopCopy {
  logoutClosing: string;
  logoutPreparingLogin: string;
  startButton: string;
  openGithub: string;
  openLinkedIn: string;
  githubTitle: string;
  linkedInTitle: string;
  fileExplorer: string;
  openFileExplorer: string;
  keyboardLanguage: string;
  showHiddenIcons: string;
  hiddenIcons: string;
  network: string;
  volume: string;
  dateAndTime: string;
  showDesktop: string;
  icons: Record<string, string>;
  windows: {
    historia: string;
    gonzai: string;
    previdocs: string;
    mail: string;
    proyectos: string;
    computer: string;
    habilidades: string;
    galeria: string;
    papelera: string;
  };
}

export const DESKTOP_I18N: Record<AppLanguage, DesktopCopy> = {
  ES: {
    logoutClosing: 'Cerrando sesión...',
    logoutPreparingLogin: 'Preparando inicio de sesión...',
    startButton: 'Inicio',
    openGithub: 'Abrir perfil de GitHub',
    openLinkedIn: 'Abrir perfil de LinkedIn',
    githubTitle: 'GitHub — breinergg',
    linkedInTitle: 'LinkedIn — Breiner Gonzalez Machado',
    fileExplorer: 'Explorador de archivos',
    openFileExplorer: 'Abrir explorador de archivos',
    keyboardLanguage: 'Idioma del teclado',
    showHiddenIcons: 'Mostrar iconos ocultos',
    hiddenIcons: 'Iconos ocultos',
    network: 'Red',
    volume: 'Volumen',
    dateAndTime: 'Fecha y hora',
    showDesktop: 'Mostrar el escritorio',
    icons: {
      historia: 'Mi Historia.docx',
      proyectos: 'Proyectos FullStack',
      galeria: 'Galería',
      gadget: 'Gadget',
      habilidades: 'Habilidades.xlsx',
      cv: 'Hoja de Vida.pdf',
      contacto: 'Contacto',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      papelera: 'Papelera de\nreciclaje'
    },
    windows: {
      historia: 'Mi Historia.docx - Word',
      gonzai: 'Gonzai.docx - Word',
      previdocs: 'PreviDocs.docx - Word',
      mail: 'Correo',
      proyectos: 'Proyectos FullStack',
      computer: 'Equipo',
      habilidades: 'Habilidades.xlsx - Excel',
      galeria: 'Galería',
      papelera: 'Papelera de reciclaje'
    }
  },
  EN: {
    logoutClosing: 'Signing out...',
    logoutPreparingLogin: 'Preparing sign-in...',
    startButton: 'Start',
    openGithub: 'Open GitHub profile',
    openLinkedIn: 'Open LinkedIn profile',
    githubTitle: 'GitHub — breinergg',
    linkedInTitle: 'LinkedIn — Breiner Gonzalez Machado',
    fileExplorer: 'File Explorer',
    openFileExplorer: 'Open File Explorer',
    keyboardLanguage: 'Keyboard language',
    showHiddenIcons: 'Show hidden icons',
    hiddenIcons: 'Hidden icons',
    network: 'Network',
    volume: 'Volume',
    dateAndTime: 'Date and time',
    showDesktop: 'Show desktop',
    icons: {
      historia: 'My Story.docx',
      proyectos: 'FullStack Projects',
      galeria: 'Gallery',
      gadget: 'Gadget',
      habilidades: 'Skills.xlsx',
      cv: 'Resume.pdf',
      contacto: 'Contact',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      papelera: 'Recycle\nBin'
    },
    windows: {
      historia: 'My Story.docx - Word',
      gonzai: 'Gonzai.docx - Word',
      previdocs: 'PreviDocs.docx - Word',
      mail: 'Mail',
      proyectos: 'FullStack Projects',
      computer: 'Computer',
      habilidades: 'Skills.xlsx - Excel',
      galeria: 'Gallery',
      papelera: 'Recycle Bin'
    }
  }
};
