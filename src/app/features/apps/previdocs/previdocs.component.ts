import { Component, HostListener } from '@angular/core';

interface DemoSlide {
  src: string;
  alt: string;
  caption: string;
}

@Component({
  selector: 'app-previdocs',
  standalone: true,
  templateUrl: './previdocs.component.html',
  styleUrl: './previdocs.component.css'
})
export class PrevidocsComponent {
  readonly demoSlides: DemoSlide[] = [
    {
      src: '/previdocs-imagenes/P1.webp',
      alt: 'Panel principal y dashboard de PreviDocs',
      caption: 'Dashboard interactivo con métricas en tiempo real de pacientes, historias y sesiones.'
    },
    {
      src: '/previdocs-imagenes/p2.webp',
      alt: 'Gestión de pacientes e historias clínicas',
      caption: 'Formularios exhaustivos para registro de historias clínicas, diagnósticos y planes de tratamiento.'
    },
    {
      src: '/previdocs-imagenes/p3.webp',
      alt: 'Seguimiento de sesiones terapéuticas',
      caption: 'Registro secuencial de sesiones con evolución clínica y autocompletado de diagnósticos.'
    },
    {
      src: '/previdocs-imagenes/p4.webp',
      alt: 'Generación de reportes PDF',
      caption: 'Reportes multipágina con diagrama familiar, impresión diagnóstica y firma digital.'
    },
    {
      src: '/previdocs-imagenes/p5.webp',
      alt: 'Interfaz de consulta y búsqueda inteligente',
      caption: 'Búsqueda integrada en bases locales y externas para agilizar la consulta clínica.'
    }
  ];

  activeSlide = 0;
  zoomOpen = false;

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.zoomOpen) {
      this.closeZoom();
    }
  }

  openZoom() {
    this.zoomOpen = true;
  }

  closeZoom() {
    this.zoomOpen = false;
  }

  prevSlide() {
    const total = this.demoSlides.length;
    this.activeSlide = (this.activeSlide - 1 + total) % total;
  }

  nextSlide() {
    const total = this.demoSlides.length;
    this.activeSlide = (this.activeSlide + 1) % total;
  }

  goToSlide(index: number) {
    this.activeSlide = index;
  }
}
