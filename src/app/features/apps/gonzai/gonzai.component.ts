import { Component, HostListener } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LanguageService } from '../../../shared/services/language.service';
import { DemoSlideCopy } from '../../../shared/constants/i18n/apps-i18n';

@Component({
  selector: 'app-gonzai',
  standalone: true,
  templateUrl: './gonzai.component.html',
  styleUrl: './gonzai.component.css'
})
export class GonzaiComponent {
  activeSlide = 0;
  zoomOpen = false;

  constructor(
    readonly lang: LanguageService,
    private sanitizer: DomSanitizer
  ) {}

  get demoSlides(): DemoSlideCopy[] {
    return this.lang.apps.gonzai.demoSlides;
  }

  get documentHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.lang.apps.gonzai.bodyHtml);
  }

  captureLabel(index: number): string {
    return this.lang.apps.wordCarousel.captureN.replace('{{n}}', String(index + 1));
  }

  enlargedViewLabel(): string {
    return this.lang.apps.wordCarousel.enlargedView.replace('{{n}}', String(this.activeSlide + 1));
  }

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
