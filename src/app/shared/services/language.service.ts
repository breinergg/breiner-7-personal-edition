import { Injectable, computed, signal } from '@angular/core';
import {
  AppLanguage,
  getStoredLanguage,
  LOGIN_I18N,
  LoginCopy,
  storeLanguage
} from '../constants/login-i18n';
import { DESKTOP_I18N, DesktopCopy } from '../constants/i18n/desktop-i18n';
import { SHARED_I18N, SharedCopy } from '../constants/i18n/shared-i18n';
import { START_MENU_I18N, StartMenuCopy } from '../constants/i18n/start-menu-i18n';
import { GADGET_I18N, GadgetCopy } from '../constants/i18n/gadget-i18n';
import { APPS_I18N, AppsCopy } from '../constants/i18n/apps-i18n';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly languageSignal = signal<AppLanguage>(getStoredLanguage());

  readonly language = this.languageSignal.asReadonly();
  readonly isEnglish = computed(() => this.languageSignal() === 'EN');

  get login(): LoginCopy {
    return LOGIN_I18N[this.languageSignal()];
  }

  get desktop(): DesktopCopy {
    return DESKTOP_I18N[this.languageSignal()];
  }

  get shared(): SharedCopy {
    return SHARED_I18N[this.languageSignal()];
  }

  get startMenu(): StartMenuCopy {
    return START_MENU_I18N[this.languageSignal()];
  }

  get gadget(): GadgetCopy {
    return GADGET_I18N[this.languageSignal()];
  }

  get apps(): AppsCopy {
    return APPS_I18N[this.languageSignal()];
  }

  setLanguage(language: AppLanguage): void {
    if (this.languageSignal() === language) {
      return;
    }
    storeLanguage(language);
    this.languageSignal.set(language);
  }

  syncFromStorage(): void {
    const stored = getStoredLanguage();
    if (this.languageSignal() !== stored) {
      this.languageSignal.set(stored);
    }
  }
}
