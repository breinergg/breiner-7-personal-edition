import { Component, ElementRef, ViewChild } from '@angular/core';

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

  readonly photos: GalleryPhoto[] = [
    { src: '/galeria/semillero.webp', title: 'Semillero GIDSYC' },
    { src: '/galeria/evento-ingenieria.webp', title: 'Evento de Tech' },
    { src: '/galeria/diplomado-liderazgo.webp', title: 'Diplomado en Liderazgo Transformacional' },
    { src: '/galeria/1er-dia-practicas.webp', title: 'Primer día de Prácticas Profesionales' },
    { src: '/galeria/voluntario.webp', title: 'Voluntario en Unimagdalena' },
    { src: '/galeria/amigos-del-alma.webp', title: 'Amigos' },
    { src: '/galeria/EL-TEAM-A.webp', title: 'El Team A' },
    { src: '/galeria/inicios-en-la-u.webp', title: 'Inicios en la U' }
  ];

  activeIndex = 0;

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
