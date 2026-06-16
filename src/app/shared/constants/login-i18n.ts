export type AppLanguage = 'ES' | 'EN';

export interface LoginCopy {
  starting: string;
  preparingDesktop: string;
  thanksForVisiting: string;
  shuttingDown: string;
  aboutTitle: string;
  aboutMessage: string;
  accessibilityLabel: string;
  languageLabel: string;
  shutDownLabel: string;
  powerOptionsLabel: string;
  morePowerOptionsLabel: string;
  languageMenuHeader: string;
  aboutBreiner7: string;
  spanishName: string;
  englishName: string;
}

export const LANGUAGE_STORAGE_KEY = 'breiner7-language';

export const LOGIN_I18N: Record<AppLanguage, LoginCopy> = {
  ES: {
    starting: 'Iniciando...',
    preparingDesktop: 'Preparando el escritorio...',
    thanksForVisiting: 'Gracias por visitarnos...',
    shuttingDown: 'Apagando sistema...',
    aboutTitle: 'Acerca de Breiner 7',
    aboutMessage:
      'Breiner 7 Personal Edition es mi portafolio personal, un espacio donde comparto proyectos, experiencias y aprendizajes que han marcado mi recorrido.\n\n' +
      'Inspirado en los primeros sistemas que despertaron mi curiosidad por la computación, este entorno reúne parte de mi historia, mi trabajo y mi evolución como desarrollador.',
    accessibilityLabel: 'Facilidad de acceso',
    languageLabel: 'Idioma',
    shutDownLabel: 'Apagar sistema',
    powerOptionsLabel: 'Opciones de energía',
    morePowerOptionsLabel: 'Más opciones de energía',
    languageMenuHeader: 'Idioma',
    aboutBreiner7: 'Acerca de Breiner 7',
    spanishName: 'Español',
    englishName: 'Inglés'
  },
  EN: {
    starting: 'Starting...',
    preparingDesktop: 'Preparing the desktop...',
    thanksForVisiting: 'Thank you for visiting...',
    shuttingDown: 'Shutting down...',
    aboutTitle: 'About Breiner 7',
    aboutMessage:
      'Breiner 7 Personal Edition is my personal portfolio, a space where I share projects, experiences, and learnings that have shaped my journey.\n\n' +
      'Inspired by the early systems that sparked my curiosity for computing, this environment brings together part of my story, my work, and my evolution as a developer.',
    accessibilityLabel: 'Ease of access',
    languageLabel: 'Language',
    shutDownLabel: 'Shut down',
    powerOptionsLabel: 'Power options',
    morePowerOptionsLabel: 'More power options',
    languageMenuHeader: 'Language',
    aboutBreiner7: 'About Breiner 7',
    spanishName: 'Spanish',
    englishName: 'English'
  }
};

export function getStoredLanguage(): AppLanguage {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return saved === 'EN' ? 'EN' : 'ES';
  } catch {
    return 'ES';
  }
}

export function storeLanguage(language: AppLanguage): void {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
    // Ignore storage errors in restricted environments.
  }
}
