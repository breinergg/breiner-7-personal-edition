import { AppLanguage } from '../login-i18n';

export interface StartMenuCopy {
  allPrograms: string;
  searchPlaceholder: string;
  shutdown: string;
  shutdownOptions: string;
  logOut: string;
  recommendationsTitle: string;
  recommendationsMessage: string;
  recentApps: { paint: string; cmd: string };
  systemLinks: { recommendations: string };
}

export const START_MENU_I18N: Record<AppLanguage, StartMenuCopy> = {
  ES: {
    allPrograms: 'Todos los programas',
    searchPlaceholder: 'Buscar programas y archivos',
    shutdown: 'Apagar',
    shutdownOptions: 'Opciones de apagado',
    logOut: 'Cerrar sesión',
    recommendationsTitle: 'Recomendaciones',
    recommendationsMessage:
      'Para una mejor experiencia, te recomendamos utilizar el modo de pantalla completa.\n\n' +
      'Puedes activarlo presionando la tecla F11 en tu teclado. Así disfrutarás del escritorio con mayor inmersión y sin las distracciones del navegador.',
    recentApps: {
      paint: 'Pintando',
      cmd: 'Símbolo del sistema'
    },
    systemLinks: {
      recommendations: 'Recomendaciones'
    }
  },
  EN: {
    allPrograms: 'All Programs',
    searchPlaceholder: 'Search programs and files',
    shutdown: 'Shut down',
    shutdownOptions: 'Shut down options',
    logOut: 'Log off',
    recommendationsTitle: 'Recommendations',
    recommendationsMessage:
      'For the best experience, we recommend using full-screen mode.\n\n' +
      'You can enable it by pressing F11 on your keyboard. This lets you enjoy the desktop with greater immersion and without browser distractions.',
    recentApps: {
      paint: 'Paint',
      cmd: 'Command Prompt'
    },
    systemLinks: {
      recommendations: 'Recommendations'
    }
  }
};
