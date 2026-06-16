import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StartMenuComponent } from '../start-menu/start-menu.component';
import { GadgetComponent } from '../gadget/gadget.component';
import { Win7WindowComponent } from '../../shared/components/win7-window/win7-window.component';
import { GonzaiComponent } from '../apps/gonzai/gonzai.component';
import { PrevidocsComponent } from '../apps/previdocs/previdocs.component';
import { MiHistoriaComponent } from '../apps/mi-historia/mi-historia.component';
import { ContactoComponent } from '../apps/contacto/contacto.component';
import { ProyectosFullstackComponent } from '../apps/proyectos-fullstack/proyectos-fullstack.component';
import { HabilidadesComponent } from '../apps/habilidades/habilidades.component';
import { GaleriaComponent } from '../apps/galeria/galeria.component';
import { PapeleraComponent } from '../apps/papelera/papelera.component';

type DesktopIconType = 'doc' | 'folder' | 'img' | 'xls' | 'pdf' | 'msg' | 'bin' | 'gadget' | 'github' | 'linkedin';

interface DesktopIcon {
  label: string;
  type: DesktopIconType;
  top: number;
  left: number;
}

const DEFAULT_DESKTOP_ICONS: DesktopIcon[] = [
  { label: 'Mi Historia.docx', type: 'doc', top: 16, left: 16 },
  { label: 'Proyectos FullStack', type: 'folder', top: 16, left: 112 },
  { label: 'Galería', type: 'img', top: 16, left: 208 },
  { label: 'Gadget', type: 'gadget', top: 16, left: 304 },
  { label: 'Habilidades.xlsx', type: 'xls', top: 112, left: 16 },
  { label: 'Hoja de Vida.pdf', type: 'pdf', top: 112, left: 112 },
  { label: 'Contacto', type: 'msg', top: 112, left: 208 },
  { label: 'GitHub', type: 'github', top: 208, left: 112 },
  { label: 'LinkedIn', type: 'linkedin', top: 208, left: 208 },
  { label: 'Papelera de\nreciclaje', type: 'bin', top: 208, left: 16 }
];

const GRID_ORIGIN_X = 16;
const GRID_ORIGIN_Y = 16;
const GRID_SIZE_X = 96;
const GRID_SIZE_Y = 96;
const ICON_WIDTH = 88;
const ICON_HEIGHT = 100;
const DRAG_THRESHOLD = 5;
const STORAGE_KEY = 'breiner7-desktop-icon-positions';
const CV_PDF_URL = '/hv/HOJA-DE-VIDA.pdf';
const GITHUB_URL = 'https://github.com/breinergg';
const LINKEDIN_URL = 'https://www.linkedin.com/in/breiner-gonzalez-machado-3a5961276';

interface AppWindowState {
  isOpen: boolean;
  isMinimized: boolean;
  left: number;
  top: number;
  zIndex: number;
}

@Component({
  selector: 'app-desktop',
  standalone: true,
  imports: [StartMenuComponent, GadgetComponent, Win7WindowComponent, MiHistoriaComponent, GonzaiComponent, PrevidocsComponent, ContactoComponent, ProyectosFullstackComponent, HabilidadesComponent, GaleriaComponent, PapeleraComponent],
  templateUrl: './desktop.component.html',
  styleUrl: './desktop.component.css'
})
export class DesktopComponent implements OnInit, OnDestroy {
  @ViewChild('iconsArea') iconsArea?: ElementRef<HTMLElement>;
  @ViewChild(GadgetComponent) gadget?: GadgetComponent;

  currentTime = '';
  currentDate = '';
  desktopIcons: DesktopIcon[] = structuredClone(DEFAULT_DESKTOP_ICONS);
  draggingIcon: DesktopIcon | null = null;
  selectedIcon: DesktopIcon | null = null;
  isStartMenuVisible = false;
  historiaWindow: AppWindowState = {
    isOpen: false,
    isMinimized: false,
    left: 100,
    top: 40,
    zIndex: 100
  };
  gonzaiWindow: AppWindowState = {
    isOpen: false,
    isMinimized: false,
    left: 130,
    top: 48,
    zIndex: 100
  };
  previdocsWindow: AppWindowState = {
    isOpen: false,
    isMinimized: false,
    left: 110,
    top: 44,
    zIndex: 100
  };
  contactoWindow: AppWindowState = {
    isOpen: false,
    isMinimized: false,
    left: 160,
    top: 72,
    zIndex: 100
  };
  proyectosWindow: AppWindowState = {
    isOpen: false,
    isMinimized: false,
    left: 120,
    top: 56,
    zIndex: 100
  };
  explorerWindow: AppWindowState = {
    isOpen: false,
    isMinimized: false,
    left: 100,
    top: 40,
    zIndex: 100
  };
  habilidadesWindow: AppWindowState = {
    isOpen: false,
    isMinimized: false,
    left: 140,
    top: 64,
    zIndex: 100
  };
  galeriaWindow: AppWindowState = {
    isOpen: false,
    isMinimized: false,
    left: 160,
    top: 56,
    zIndex: 100
  };
  papeleraWindow: AppWindowState = {
    isOpen: false,
    isMinimized: false,
    left: 130,
    top: 72,
    zIndex: 100
  };

  private timeInterval: ReturnType<typeof setInterval> | undefined;
  private nextZIndex = 100;
  private isDragging = false;
  private dragOffsetX = 0;
  private dragOffsetY = 0;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragOriginLeft = 0;
  private dragOriginTop = 0;
  private lastIconDragAt = 0;

  ngOnInit() {
    this.loadIconPositions();
    this.updateTime();
    this.timeInterval = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy() {
    if (this.timeInterval) {
      clearInterval(this.timeInterval);
    }
  }

  onIconPointerDown(event: PointerEvent, icon: DesktopIcon) {
    if (event.button !== 0) {
      return;
    }

    event.preventDefault();
    const target = event.currentTarget as HTMLElement | null;
    target?.setPointerCapture(event.pointerId);

    const point = this.getContainerPoint(event.clientX, event.clientY);

    this.draggingIcon = icon;
    this.selectedIcon = icon;
    this.isDragging = false;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
    this.dragOffsetX = point.x - icon.left;
    this.dragOffsetY = point.y - icon.top;
    this.dragOriginLeft = icon.left;
    this.dragOriginTop = icon.top;
  }

  onIconPointerMove(event: PointerEvent, icon: DesktopIcon) {
    if (this.draggingIcon !== icon) {
      return;
    }

    if (!this.isDragging) {
      const dx = event.clientX - this.dragStartX;
      const dy = event.clientY - this.dragStartY;
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) {
        return;
      }
      this.isDragging = true;
    }

    const point = this.getContainerPoint(event.clientX, event.clientY);
    icon.left = this.clampX(point.x - this.dragOffsetX);
    icon.top = this.clampY(point.y - this.dragOffsetY);
  }

  onIconPointerUp(event: PointerEvent, icon: DesktopIcon) {
    if (this.draggingIcon !== icon) {
      return;
    }

    (event.currentTarget as HTMLElement | null)?.releasePointerCapture(event.pointerId);

    if (this.isDragging) {
      const snapped = this.snapToGrid(icon.left, icon.top);
      this.placeIconAt(icon, snapped.left, snapped.top);
      this.saveIconPositions();
      this.lastIconDragAt = Date.now();
    }

    this.draggingIcon = null;
    this.isDragging = false;
  }

  onIconsAreaPointerDown(event: PointerEvent) {
    if (event.target === this.iconsArea?.nativeElement) {
      this.selectedIcon = null;
    }
  }

  private getContainerPoint(clientX: number, clientY: number): { x: number; y: number } {
    const rect = this.iconsArea?.nativeElement.getBoundingClientRect();
    if (!rect) {
      return { x: clientX, y: clientY };
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  private snapToGrid(left: number, top: number): { left: number; top: number } {
    return {
      left: GRID_ORIGIN_X + Math.round((left - GRID_ORIGIN_X) / GRID_SIZE_X) * GRID_SIZE_X,
      top: GRID_ORIGIN_Y + Math.round((top - GRID_ORIGIN_Y) / GRID_SIZE_Y) * GRID_SIZE_Y
    };
  }

  private placeIconAt(icon: DesktopIcon, left: number, top: number) {
    const clamped = {
      left: this.clampX(left),
      top: this.clampY(top)
    };
    const snapped = this.snapToGrid(clamped.left, clamped.top);
    const occupant = this.desktopIcons.find(
      candidate => candidate !== icon && candidate.left === snapped.left && candidate.top === snapped.top
    );

    if (occupant) {
      occupant.left = this.dragOriginLeft;
      occupant.top = this.dragOriginTop;
    }

    icon.left = snapped.left;
    icon.top = snapped.top;
  }

  private clampX(left: number): number {
    const maxLeft = Math.max(0, (this.iconsArea?.nativeElement.clientWidth ?? window.innerWidth) - ICON_WIDTH);
    return Math.max(0, Math.min(left, maxLeft));
  }

  private clampY(top: number): number {
    const maxTop = Math.max(0, (this.iconsArea?.nativeElement.clientHeight ?? window.innerHeight) - ICON_HEIGHT);
    return Math.max(0, Math.min(top, maxTop));
  }

  private loadIconPositions() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }

      const saved = JSON.parse(raw) as Record<string, { left: number; top: number }>;
      for (const icon of this.desktopIcons) {
        const position = saved[icon.label];
        if (position) {
          const snapped = this.snapToGrid(position.left, position.top);
          icon.left = snapped.left;
          icon.top = snapped.top;
        }
      }
    } catch {
      this.desktopIcons = structuredClone(DEFAULT_DESKTOP_ICONS);
    }
  }

  private saveIconPositions() {
    const positions = Object.fromEntries(
      this.desktopIcons.map(icon => [icon.label, { left: icon.left, top: icon.top }])
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  }

  toggleStartMenu() {
    this.isStartMenuVisible = !this.isStartMenuVisible;
  }

  onIconDoubleClick(event: MouseEvent, icon: DesktopIcon) {
    if (Date.now() - this.lastIconDragAt < 300) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (icon.type === 'gadget') {
      this.gadget?.showGadget();
      return;
    }

    if (icon.type === 'doc') {
      this.openHistoriaWindow();
      return;
    }

    if (icon.type === 'msg') {
      this.openContactoWindow();
      return;
    }

    if (icon.type === 'folder') {
      this.openProyectosWindow();
      return;
    }

    if (icon.type === 'xls') {
      this.openHabilidadesWindow();
      return;
    }

    if (icon.type === 'img') {
      this.openGaleriaWindow();
      return;
    }

    if (icon.type === 'pdf') {
      this.openCvPdf();
      return;
    }

    if (icon.type === 'bin') {
      this.openPapeleraWindow();
      return;
    }

    if (icon.type === 'github') {
      this.openGithubProfile();
      return;
    }

    if (icon.type === 'linkedin') {
      this.openLinkedInProfile();
    }
  }

  openCvPdf() {
    window.open(CV_PDF_URL, '_blank', 'noopener,noreferrer');
  }

  openGithubProfile() {
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
  }

  openLinkedInProfile() {
    window.open(LINKEDIN_URL, '_blank', 'noopener,noreferrer');
  }

  openHistoriaWindow() {
    if (this.historiaWindow.isOpen) {
      this.historiaWindow.isMinimized = false;
      this.bringWindowToFront(this.historiaWindow);
      return;
    }

    this.historiaWindow.isOpen = true;
    this.historiaWindow.isMinimized = false;
    this.bringWindowToFront(this.historiaWindow);
  }

  closeHistoriaWindow() {
    this.historiaWindow.isOpen = false;
    this.historiaWindow.isMinimized = false;
  }

  minimizeHistoriaWindow() {
    this.historiaWindow.isMinimized = true;
  }

  focusHistoriaWindow() {
    this.bringWindowToFront(this.historiaWindow);
  }

  onHistoriaPositionChange(position: { left: number; top: number }) {
    this.historiaWindow.left = position.left;
    this.historiaWindow.top = position.top;
  }

  openGonzaiWindow() {
    if (this.gonzaiWindow.isOpen) {
      this.gonzaiWindow.isMinimized = false;
      this.bringWindowToFront(this.gonzaiWindow);
      return;
    }

    this.gonzaiWindow.isOpen = true;
    this.gonzaiWindow.isMinimized = false;
    this.bringWindowToFront(this.gonzaiWindow);
  }

  closeGonzaiWindow() {
    this.gonzaiWindow.isOpen = false;
    this.gonzaiWindow.isMinimized = false;
  }

  minimizeGonzaiWindow() {
    this.gonzaiWindow.isMinimized = true;
  }

  focusGonzaiWindow() {
    this.bringWindowToFront(this.gonzaiWindow);
  }

  onGonzaiPositionChange(position: { left: number; top: number }) {
    this.gonzaiWindow.left = position.left;
    this.gonzaiWindow.top = position.top;
  }

  openPrevidocsWindow() {
    if (this.previdocsWindow.isOpen) {
      this.previdocsWindow.isMinimized = false;
      this.bringWindowToFront(this.previdocsWindow);
      return;
    }

    this.previdocsWindow.isOpen = true;
    this.previdocsWindow.isMinimized = false;
    this.bringWindowToFront(this.previdocsWindow);
  }

  closePrevidocsWindow() {
    this.previdocsWindow.isOpen = false;
    this.previdocsWindow.isMinimized = false;
  }

  minimizePrevidocsWindow() {
    this.previdocsWindow.isMinimized = true;
  }

  focusPrevidocsWindow() {
    this.bringWindowToFront(this.previdocsWindow);
  }

  onPrevidocsPositionChange(position: { left: number; top: number }) {
    this.previdocsWindow.left = position.left;
    this.previdocsWindow.top = position.top;
  }

  onExplorerDocumentOpen(documentId: 'gonzai' | 'historia' | 'previdocs') {
    if (documentId === 'gonzai') {
      this.openGonzaiWindow();
      return;
    }

    if (documentId === 'previdocs') {
      this.openPrevidocsWindow();
      return;
    }

    if (documentId === 'historia') {
      this.openHistoriaWindow();
    }
  }

  onStartMenuDocumentOpen(documentId: 'gonzai' | 'previdocs') {
    this.isStartMenuVisible = false;
    this.onExplorerDocumentOpen(documentId);
  }

  openContactoWindow() {
    if (this.contactoWindow.isOpen) {
      this.contactoWindow.isMinimized = false;
      this.bringWindowToFront(this.contactoWindow);
      return;
    }

    this.contactoWindow.isOpen = true;
    this.contactoWindow.isMinimized = false;
    this.bringWindowToFront(this.contactoWindow);
  }

  closeContactoWindow() {
    this.contactoWindow.isOpen = false;
    this.contactoWindow.isMinimized = false;
  }

  minimizeContactoWindow() {
    this.contactoWindow.isMinimized = true;
  }

  focusContactoWindow() {
    this.bringWindowToFront(this.contactoWindow);
  }

  onContactoPositionChange(position: { left: number; top: number }) {
    this.contactoWindow.left = position.left;
    this.contactoWindow.top = position.top;
  }

  openProyectosWindow() {
    if (this.proyectosWindow.isOpen) {
      this.proyectosWindow.isMinimized = false;
      this.bringWindowToFront(this.proyectosWindow);
      return;
    }

    this.proyectosWindow.isOpen = true;
    this.proyectosWindow.isMinimized = false;
    this.bringWindowToFront(this.proyectosWindow);
  }

  closeProyectosWindow() {
    this.proyectosWindow.isOpen = false;
    this.proyectosWindow.isMinimized = false;
  }

  minimizeProyectosWindow() {
    this.proyectosWindow.isMinimized = true;
  }

  focusProyectosWindow() {
    this.bringWindowToFront(this.proyectosWindow);
  }

  onProyectosPositionChange(position: { left: number; top: number }) {
    this.proyectosWindow.left = position.left;
    this.proyectosWindow.top = position.top;
  }

  openExplorerWindow() {
    if (this.explorerWindow.isOpen) {
      this.explorerWindow.isMinimized = false;
      this.bringWindowToFront(this.explorerWindow);
      return;
    }

    this.explorerWindow.isOpen = true;
    this.explorerWindow.isMinimized = false;
    this.bringWindowToFront(this.explorerWindow);
  }

  closeExplorerWindow() {
    this.explorerWindow.isOpen = false;
    this.explorerWindow.isMinimized = false;
  }

  minimizeExplorerWindow() {
    this.explorerWindow.isMinimized = true;
  }

  focusExplorerWindow() {
    this.bringWindowToFront(this.explorerWindow);
  }

  onExplorerPositionChange(position: { left: number; top: number }) {
    this.explorerWindow.left = position.left;
    this.explorerWindow.top = position.top;
  }

  openHabilidadesWindow() {
    if (this.habilidadesWindow.isOpen) {
      this.habilidadesWindow.isMinimized = false;
      this.bringWindowToFront(this.habilidadesWindow);
      return;
    }

    this.habilidadesWindow.isOpen = true;
    this.habilidadesWindow.isMinimized = false;
    this.bringWindowToFront(this.habilidadesWindow);
  }

  closeHabilidadesWindow() {
    this.habilidadesWindow.isOpen = false;
    this.habilidadesWindow.isMinimized = false;
  }

  minimizeHabilidadesWindow() {
    this.habilidadesWindow.isMinimized = true;
  }

  focusHabilidadesWindow() {
    this.bringWindowToFront(this.habilidadesWindow);
  }

  onHabilidadesPositionChange(position: { left: number; top: number }) {
    this.habilidadesWindow.left = position.left;
    this.habilidadesWindow.top = position.top;
  }

  openGaleriaWindow() {
    if (this.galeriaWindow.isOpen) {
      this.galeriaWindow.isMinimized = false;
      this.bringWindowToFront(this.galeriaWindow);
      return;
    }

    this.galeriaWindow.isOpen = true;
    this.galeriaWindow.isMinimized = false;
    this.bringWindowToFront(this.galeriaWindow);
  }

  closeGaleriaWindow() {
    this.galeriaWindow.isOpen = false;
    this.galeriaWindow.isMinimized = false;
  }

  minimizeGaleriaWindow() {
    this.galeriaWindow.isMinimized = true;
  }

  focusGaleriaWindow() {
    this.bringWindowToFront(this.galeriaWindow);
  }

  onGaleriaPositionChange(position: { left: number; top: number }) {
    this.galeriaWindow.left = position.left;
    this.galeriaWindow.top = position.top;
  }

  openPapeleraWindow() {
    if (this.papeleraWindow.isOpen) {
      this.papeleraWindow.isMinimized = false;
      this.bringWindowToFront(this.papeleraWindow);
      return;
    }

    this.papeleraWindow.isOpen = true;
    this.papeleraWindow.isMinimized = false;
    this.bringWindowToFront(this.papeleraWindow);
  }

  closePapeleraWindow() {
    this.papeleraWindow.isOpen = false;
    this.papeleraWindow.isMinimized = false;
  }

  minimizePapeleraWindow() {
    this.papeleraWindow.isMinimized = true;
  }

  focusPapeleraWindow() {
    this.bringWindowToFront(this.papeleraWindow);
  }

  onPapeleraPositionChange(position: { left: number; top: number }) {
    this.papeleraWindow.left = position.left;
    this.papeleraWindow.top = position.top;
  }

  private bringWindowToFront(window: AppWindowState) {
    this.nextZIndex += 1;
    window.zIndex = this.nextZIndex;
  }

  private updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    this.currentTime = `${hours}:${minutes}`;

    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    this.currentDate = `${day}/${month}/${year}`;
  }
}
