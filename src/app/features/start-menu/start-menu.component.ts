import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartMenuAppIconComponent } from './start-menu-app-icon/start-menu-app-icon.component';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { USER_AVATAR } from '../../shared/constants/user-avatar';
import { LanguageService } from '../../shared/services/language.service';

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
  @Output() logout = new EventEmitter<void>();

  searchQuery = '';
  showRecommendationsModal = false;
  showShutdownMenu = false;

  userAvatar = USER_AVATAR.menu;

  constructor(readonly lang: LanguageService) {}

  get recentApps(): AppItem[] {
    const copy = this.lang.startMenu;
    return [
      { icon: 'word', name: 'Word', hasSubmenu: true },
      { icon: 'excel', name: 'Excel', hasSubmenu: true },
      { icon: 'paint', name: copy.recentApps.paint, hasSubmenu: true },
      { icon: 'cmd', name: copy.recentApps.cmd, hasSubmenu: true }
    ];
  }

  get systemLinks(): SystemLink[] {
    const copy = this.lang.startMenu;
    return [
      { name: 'Previdocs', action: 'previdocs' },
      { name: 'Gonzai', action: 'gonzai' },
      { name: copy.systemLinks.recommendations, action: 'recomendaciones' }
    ];
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.showShutdownMenu = false;
  }

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

  onShutdownClick(event: Event): void {
    event.stopPropagation();
    this.showShutdownMenu = !this.showShutdownMenu;
  }

  onShutdownMenuClick(event: Event): void {
    event.stopPropagation();
    this.showShutdownMenu = !this.showShutdownMenu;
  }

  onLogoutClick(): void {
    this.showShutdownMenu = false;
    this.logout.emit();
  }
}
