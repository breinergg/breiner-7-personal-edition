import { Component, ElementRef, ViewChild } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';

export interface GalleryPhoto {
  src: string;
  title: string;
}

@Component({
  selector: 'app-galeria',
  standalone: true,
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.css'
})
export class GaleriaComponent {
  @ViewChild('scrollContainer') scrollContainer?: ElementRef<HTMLElement>;

  activeIndex = 0;

  constructor(readonly lang: LanguageService) {}

  get photos(): GalleryPhoto[] {
    const titles = this.lang.apps.galeria.photoTitles;
    const sources = [
      '/galeria/semillero.webp',
      '/galeria/evento-ingenieria.webp',
      '/galeria/diplomado-liderazgo.webp',
      '/galeria/1er-dia-practicas.webp',
      '/galeria/voluntario.webp',
      '/galeria/amigos-del-alma.webp',
      '/galeria/EL-TEAM-A.webp',
      '/galeria/inicios-en-la-u.webp'
    ];
    return sources.map((src, index) => ({ src, title: titles[index] }));
  }

  get photosCountLabel(): string {
    return this.lang.apps.galeria.photosCount.replace('{{count}}', String(this.photos.length));
  }

  onScroll(event: Event) {
    const container = event.target as HTMLElement;
    const items = container.querySelectorAll<HTMLElement>('.gallery-photo');
    if (items.length === 0) {
      return;
    }

    const containerCenter = container.scrollTop + container.clientHeight / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    items.forEach((item, index) => {
      const itemCenter = item.offsetTop + item.offsetHeight / 2;
      const distance = Math.abs(containerCenter - itemCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    this.activeIndex = closestIndex;
  }

  scrollToPhoto(index: number) {
    const container = this.scrollContainer?.nativeElement;
    const target = container?.querySelectorAll<HTMLElement>('.gallery-photo')[index];
    if (!container || !target) {
      return;
    }

    container.scrollTo({
      top: target.offsetTop - 12,
      behavior: 'smooth'
    });
    this.activeIndex = index;
  }
}
