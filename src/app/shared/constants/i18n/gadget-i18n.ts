import { AppLanguage } from '../login-i18n';

export interface GadgetCopy {
  minimize: string;
  info: string;
  close: string;
  techLabel: string;
  projectsLabel: string;
  role: string;
  profileSummaryTitle: string;
  infoMessage: (projects: number, technologies: number) => string;
}

export const GADGET_I18N: Record<AppLanguage, GadgetCopy> = {
  ES: {
    minimize: 'Minimizar',
    info: 'Info',
    close: 'Cerrar',
    techLabel: 'Tecno.',
    projectsLabel: 'Proyectos',
    role: 'Ingeniero de Sistemas',
    profileSummaryTitle: 'Resumen del perfil',
    infoMessage: (projects, technologies) =>
      `Breiner destaca ${projects} proyectos en su repositorio y maneja alrededor de ${technologies} tecnologías.`
  },
  EN: {
    minimize: 'Minimize',
    info: 'Info',
    close: 'Close',
    techLabel: 'Tech',
    projectsLabel: 'Projects',
    role: 'Systems Engineer',
    profileSummaryTitle: 'Profile summary',
    infoMessage: (projects, technologies) =>
      `Breiner highlights ${projects} projects in his repository and works with around ${technologies} technologies.`
  }
};
