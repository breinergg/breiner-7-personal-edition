import { Component, HostListener } from '@angular/core';

interface DemoSlide {
  src: string;
  alt: string;
  caption: string;
}

@Component({
  selector: 'app-gonzai',
  standalone: true,
  templateUrl: './gonzai.component.html',
  styleUrl: './gonzai.component.css'
})
export class GonzaiComponent {
  readonly demoSlides: DemoSlide[] = [
    {
      src: '/gonzai-imagenes/gg1.webp',
      alt: 'Vista general del panel principal de GonzAI',
      caption: 'Panel principal con acceso centralizado a los módulos del sistema.'
    },
    {
      src: '/gonzai-imagenes/gg2.webp',
      alt: 'Módulo de gestión de ventas e inventario',
      caption: 'Registro de ventas y control de stock en tiempo real.'
    },
    {
      src: '/gonzai-imagenes/gg33.webp',
      alt: 'Administración de clientes y cartera',
      caption: 'Seguimiento de clientes, abonos y saldos pendientes.'
    },
    {
      src: '/gonzai-imagenes/gg4.webp',
      alt: 'Asistente inteligente GonzAI',
      caption: 'Interfaz del asistente con IA integrada para consultas operativas.'
    },
    {
      src: '/gonzai-imagenes/gg5.webp',
      alt: 'Dashboard estadístico de GonzAI',
      caption: 'Indicadores y métricas para la toma de decisiones informadas.'
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
