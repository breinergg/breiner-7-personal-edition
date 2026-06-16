import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { USER_AVATAR } from '../../shared/constants/user-avatar';
import { AppLanguage, LoginCopy } from '../../shared/constants/login-i18n';
import { LanguageService } from '../../shared/services/language.service';

interface LanguageOption {
  code: AppLanguage;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  readonly userAvatar = USER_AVATAR.login;

  loading = false;
  loadingText = '';
  isShuttingDown = false;
  shutdownText = '';
  sessionEntrance = false;

  showPowerMenu = false;
  showAccessibilityMenu = false;
  showLanguageMenu = false;
  showAboutModal = false;

  readonly languages: LanguageOption[] = [
    { code: 'ES' },
    { code: 'EN' }
  ];

  constructor(
    private router: Router,
    readonly languageService: LanguageService
  ) {}

  private shutdownTimer: ReturnType<typeof setTimeout> | undefined;

  ngOnInit() {
    this.syncLocalizedTexts();

    const navState = history.state as { fromLogout?: boolean };
    if (navState?.fromLogout) {
      this.sessionEntrance = true;
      setTimeout(() => {
        this.sessionEntrance = false;
      }, 800);
    }
  }

  ngOnDestroy() {
    if (this.shutdownTimer) {
      clearTimeout(this.shutdownTimer);
    }
  }

  get selectedLanguage(): AppLanguage {
    return this.languageService.language();
  }

  get copy(): LoginCopy {
    return this.languageService.login;
  }

  get statusActive(): boolean {
    return this.loading || this.isShuttingDown;
  }

  get statusText(): string {
    return this.isShuttingDown ? this.shutdownText : this.loadingText;
  }

  getLanguageName(code: AppLanguage): string {
    return code === 'ES' ? this.copy.spanishName : this.copy.englishName;
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.closeAllMenus();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeAllMenus();
  }

  selectUser() {
    if (this.statusActive) return;
    this.loading = true;
    this.loadingText = this.copy.starting;
    this.closeAllMenus();

    setTimeout(() => {
      this.loadingText = this.copy.preparingDesktop;
      setTimeout(() => {
        this.router.navigate(['/desktop']);
      }, 1500);
    }, 1500);
  }

  togglePowerMenu(event: Event) {
    event.stopPropagation();
    this.showPowerMenu = !this.showPowerMenu;
    this.showAccessibilityMenu = false;
    this.showLanguageMenu = false;
  }

  toggleAccessibilityMenu(event: Event) {
    event.stopPropagation();
    this.showAccessibilityMenu = !this.showAccessibilityMenu;
    this.showPowerMenu = false;
    this.showLanguageMenu = false;
  }

  toggleLanguageMenu(event: Event) {
    event.stopPropagation();
    this.showLanguageMenu = !this.showLanguageMenu;
    this.showPowerMenu = false;
    this.showAccessibilityMenu = false;
  }

  selectLanguage(lang: LanguageOption) {
    if (this.selectedLanguage === lang.code) {
      this.showLanguageMenu = false;
      return;
    }

    this.languageService.setLanguage(lang.code);
    this.syncLocalizedTexts();
    this.showLanguageMenu = false;
  }

  aboutBreiner7() {
    this.showAccessibilityMenu = false;
    this.showAboutModal = true;
  }

  closeAboutModal() {
    this.showAboutModal = false;
  }

  shutdown() {
    if (this.statusActive) {
      return;
    }

    this.closeAllMenus();
    this.isShuttingDown = true;
    this.shutdownText = this.copy.thanksForVisiting;

    this.shutdownTimer = setTimeout(() => {
      this.shutdownText = this.copy.shuttingDown;
      this.shutdownTimer = setTimeout(() => {
        window.location.reload();
      }, 1500);
    }, 1500);
  }

  closeAllMenus() {
    this.showPowerMenu = false;
    this.showAccessibilityMenu = false;
    this.showLanguageMenu = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  private syncLocalizedTexts() {
    if (!this.loading && !this.isShuttingDown) {
      this.loadingText = this.copy.starting;
      this.shutdownText = this.copy.thanksForVisiting;
      return;
    }

    if (this.loading) {
      this.loadingText = this.copy.starting;
    }

    if (this.isShuttingDown) {
      this.shutdownText = this.copy.thanksForVisiting;
    }
  }
}
