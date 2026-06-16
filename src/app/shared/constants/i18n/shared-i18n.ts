import { AppLanguage } from '../login-i18n';

export interface SharedCopy {
  accept: string;
  cancel: string;
  close: string;
  minimize: string;
  maximize: string;
  wordHome: string;
  wordInsert: string;
  wordPageDesign: string;
  excelFormulas: string;
}

export const SHARED_I18N: Record<AppLanguage, SharedCopy> = {
  ES: {
    accept: 'Aceptar',
    cancel: 'Cancelar',
    close: 'Cerrar',
    minimize: 'Minimizar',
    maximize: 'Maximizar',
    wordHome: 'Inicio',
    wordInsert: 'Insertar',
    wordPageDesign: 'Diseño de página',
    excelFormulas: 'Fórmulas'
  },
  EN: {
    accept: 'OK',
    cancel: 'Cancel',
    close: 'Close',
    minimize: 'Minimize',
    maximize: 'Maximize',
    wordHome: 'Home',
    wordInsert: 'Insert',
    wordPageDesign: 'Page Layout',
    excelFormulas: 'Formulas'
  }
};
