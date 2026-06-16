import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { USER_AVATAR } from '../../shared/constants/user-avatar';

interface Language {
  code: string;
  name: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  readonly userAvatar = USER_AVATAR.login;

  loading = false;
  loadingText = 'Iniciando...';

  showPowerMenu = false;
  showAccessibilityMenu = false;
  showLanguageMenu = false;
  showAboutModal = false;

  aboutModalMessage = `Breiner 7 Personal Edition es mi repositorio personal, un espacio donde comparto proyectos, experiencias y aprendizajes que han marcado mi recorrido en la tecnología.

Inspirado en los primeros sistemas que despertaron mi curiosidad por la computación, este entorno reúne parte de mi historia, mi trabajo y mi evolución como desarrollador.`;

  selectedLanguage = 'ES';

  languages: Language[] = [
    { code: 'ES', name: 'Español' },
    { code: 'EN', name: 'Inglés' }
  ];

  constructor(private router: Router) {}

  @HostListener('document:click')
  onDocumentClick() {
    this.closeAllMenus();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.closeAllMenus();
  }

  selectUser() {
    if (this.loading) return;
    this.loading = true;
    this.loadingText = 'Iniciando...';
    this.closeAllMenus();

    setTimeout(() => {
      this.loadingText = 'Preparando el escritorio...';
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

  selectLanguage(lang: Language) {
    this.selectedLanguage = lang.code;
    this.showLanguageMenu = false;
  }

  aboutBreiner7() {
    this.showAccessibilityMenu = false;
    this.showAboutModal = true;
  }

  closeAboutModal() {
    this.showAboutModal = false;
  }

  shutdown() { this.showPowerMenu = false; }
  restart() { this.showPowerMenu = false; }

  closeAllMenus() {
    this.showPowerMenu = false;
    this.showAccessibilityMenu = false;
    this.showLanguageMenu = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  getLanguageName(): string {
    return this.languages.find(l => l.code === this.selectedLanguage)?.name ?? '';
  }
}
