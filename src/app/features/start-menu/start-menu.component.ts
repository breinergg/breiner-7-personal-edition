import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartMenuAppIconComponent } from './start-menu-app-icon/start-menu-app-icon.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { USER_AVATAR } from '../../shared/constants/user-avatar';

interface AppItem {
  icon: string;
  name: string;
  hasSubmenu?: boolean;
}

type SystemLinkAction = 'previdocs' | 'gonzai' | 'recomendaciones';

interface SystemLink {
  name: string;
  action: SystemLinkAction;
}

@Component({
  selector: 'app-start-menu',
  standalone: true,
  imports: [CommonModule, StartMenuAppIconComponent, ModalComponent],
  templateUrl: './start-menu.component.html',
  styleUrl: './start-menu.component.css'
})
export class StartMenuComponent {
  @Input() isVisible = false;
  @Output() documentOpen = new EventEmitter<'gonzai' | 'previdocs'>();

  searchQuery = '';
  showRecommendationsModal = false;

  readonly recommendationsMessage =
    'Para una mejor experiencia, te recomendamos utilizar el modo de pantalla completa.\n\n' +
    'Puedes activarlo presionando la tecla F11 en tu teclado. Así disfrutarás del escritorio con mayor inmersión y sin las distracciones del navegador.';

  recentApps: AppItem[] = [
    { icon: 'word', name: 'Word', hasSubmenu: true },
    { icon: 'excel', name: 'Excel', hasSubmenu: true },
    { icon: 'paint', name: 'Pintando', hasSubmenu: true },
    { icon: 'cmd', name: 'Símbolo del sistema', hasSubmenu: true }
  ];

  systemLinks: SystemLink[] = [
    { name: 'Previdocs', action: 'previdocs' },
    { name: 'Gonzai', action: 'gonzai' },
    { name: 'Recomendaciones', action: 'recomendaciones' }
  ];

  userAvatar = USER_AVATAR.menu;

  toggleMenu(): void {
    this.isVisible = !this.isVisible;
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
  }

  onAppClick(app: AppItem): void {
    console.log('App clicked:', app.name);
  }

  onSystemLinkClick(link: SystemLink): void {
    if (link.action === 'previdocs' || link.action === 'gonzai') {
      this.documentOpen.emit(link.action);
      return;
    }

    if (link.action === 'recomendaciones') {
      this.showRecommendationsModal = true;
    }
  }

  closeRecommendationsModal(): void {
    this.showRecommendationsModal = false;
  }

  onAllProgramsClick(): void {
    console.log('All programs clicked');
  }

  onShutdownClick(): void {
    console.log('Shutdown clicked');
  }

  onShutdownMenuClick(): void {
    console.log('Shutdown menu clicked');
  }
}
