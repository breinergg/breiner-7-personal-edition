import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalComponent } from '../../shared/components/modal/modal.component';
import { LanguageService } from '../../shared/services/language.service';

const STORAGE_KEY = 'breiner7-gadget-position';
const GAUGE_MIN = -150;
const GAUGE_MAX = -30;

interface GaugeTick {
  angle: number;
  color: string;
  width: number;
}

interface GaugeZone {
  start: number;
  end: number;
  color: string;
  opacity: number;
}

@Component({
  selector: 'app-gadget',
  standalone: true,
  imports: [ModalComponent],
  templateUrl: './gadget.component.html',
  styleUrl: './gadget.component.css'
})
export class GadgetComponent implements OnInit, OnDestroy {
  isVisible = false;
  isMinimized = false;
  isInfoVisible = false;
  isDragging = false;

  projects = 6;
  technologies = 8;

  position = { x: 20, y: 20 };

  readonly projectNeedleAngle = this.valueToNeedleRotation(this.projects);
  readonly techNeedleAngle = this.valueToNeedleRotation(this.technologies);

  readonly largeTicks = this.buildTicks();
  readonly smallTicks = this.buildTicks();
  readonly largeZones = this.buildColorZones();
  readonly smallZones = this.buildColorZones();

  constructor(readonly lang: LanguageService) {}

  get infoModalMessage(): string {
    return this.lang.gadget.infoMessage(this.projects, this.technologies);
  }

  private dragOffsetX = 0;
  private dragOffsetY = 0;

  ngOnInit() {
    this.loadPosition();
  }

  ngOnDestroy() {
    this.savePosition();
  }

  tickInner(angle: number, outerRadius: number): number {
    return this.polarX(angle, outerRadius - 4);
  }

  tickInnerY(angle: number, outerRadius: number): number {
    return this.polarY(angle, outerRadius - 4);
  }

  tickOuter(angle: number, outerRadius: number): number {
    return this.polarX(angle, outerRadius);
  }

  tickOuterY(angle: number, outerRadius: number): number {
    return this.polarY(angle, outerRadius);
  }

  arcWedgePath(startAngle: number, endAngle: number, innerR: number, outerR: number): string {
    const x = (r: number, a: number) => this.polarX(a, r);
    const y = (r: number, a: number) => this.polarY(a, r);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return [
      `M ${x(innerR, startAngle)} ${y(innerR, startAngle)}`,
      `L ${x(outerR, startAngle)} ${y(outerR, startAngle)}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${x(outerR, endAngle)} ${y(outerR, endAngle)}`,
      `L ${x(innerR, endAngle)} ${y(innerR, endAngle)}`,
      `A ${innerR} ${innerR} 0 ${largeArc} 0 ${x(innerR, startAngle)} ${y(innerR, startAngle)}`,
      'Z'
    ].join(' ');
  }

  onGadgetPointerDown(event: PointerEvent) {
    if (event.button !== 0) {
      return;
    }

    if ((event.target as HTMLElement).closest('.gadget-controls')) {
      return;
    }

    event.preventDefault();
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);

    this.isDragging = true;
    this.dragOffsetX = event.clientX - this.position.x;
    this.dragOffsetY = event.clientY - this.position.y;
  }

  onGadgetPointerMove(event: PointerEvent) {
    if (!this.isDragging) {
      return;
    }

    this.position.x = event.clientX - this.dragOffsetX;
    this.position.y = event.clientY - this.dragOffsetY;

    this.position.x = Math.max(0, Math.min(window.innerWidth - 168, this.position.x));
    this.position.y = Math.max(0, Math.min(window.innerHeight - 140, this.position.y));
  }

  onGadgetPointerUp(event: PointerEvent) {
    if (!this.isDragging) {
      return;
    }

    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
    this.isDragging = false;
    this.savePosition();
  }

  onMinimize() {
    this.isMinimized = !this.isMinimized;
    this.isInfoVisible = false;
  }

  onInfo() {
    this.isInfoVisible = !this.isInfoVisible;
  }

  closeInfoModal() {
    this.isInfoVisible = false;
  }

  onClose() {
    this.isVisible = false;
    this.isInfoVisible = false;
  }

  showGadget() {
    this.isVisible = true;
    this.isMinimized = false;
    this.isInfoVisible = false;
  }

  private valueToNeedleRotation(value: number): number {
    const ratio = Math.max(0, Math.min(value / 10, 1));
    const scaleAngle = GAUGE_MIN + ratio * (GAUGE_MAX - GAUGE_MIN);
    return scaleAngle + 90;
  }

  private buildColorZones(): GaugeZone[] {
    return [
      { start: -150, end: -108, color: '#b4bac4', opacity: 0.62 },
      { start: -108, end: -88, color: '#f5e34a', opacity: 0.72 },
      { start: -88, end: -58, color: '#f08a24', opacity: 0.78 },
      { start: -58, end: -30, color: '#e52b2b', opacity: 0.82 }
    ];
  }

  private buildTicks(): GaugeTick[] {
    const ticks: GaugeTick[] = [];
    const start = GAUGE_MIN;
    const end = GAUGE_MAX;
    const count = 13;

    for (let i = 0; i < count; i++) {
      const ratio = i / (count - 1);
      const angle = start + ratio * (end - start);
      let color = '#2b2b2b';
      let width = 0.8;

      if (ratio > 0.72) {
        color = '#d62828';
        width = 1.4;
      } else if (ratio > 0.55) {
        color = '#e67e22';
        width = 1.2;
      } else if (ratio > 0.38) {
        color = '#d4a017';
        width = 1;
      }

      ticks.push({ angle, color, width });
    }

    return ticks;
  }

  private polarX(angle: number, radius: number): number {
    const rad = (angle * Math.PI) / 180;
    return Math.cos(rad) * radius;
  }

  private polarY(angle: number, radius: number): number {
    const rad = (angle * Math.PI) / 180;
    return Math.sin(rad) * radius;
  }

  private loadPosition() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.position.x = parsed.x ?? 20;
        this.position.y = parsed.y ?? 20;
      }
    } catch {
      this.position = { x: 20, y: 20 };
    }
  }

  private savePosition() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.position));
  }
}
