import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorbDocIconComponent } from '../../../shared/components/worb-doc-icon/worb-doc-icon.component';

export type ExplorerLocation =
  | 'desktop'
  | 'proyectos'
  | 'documentos'
  | 'imagenes'
  | 'disco-local';

export type ExplorerIconKind =
  | 'worb'
  | 'folder'
  | 'img'
  | 'xls'
  | 'pdf'
  | 'mail'
  | 'bin'
  | 'gadget'
  | 'drive';

export type ExplorerDocumentId = 'gonzai' | 'historia' | 'previdocs';

export interface ExplorerItem {
  id: string;
  name: string;
  type: string;
  modified: string;
  size: string;
  iconKind: ExplorerIconKind;
  opensLocation?: ExplorerLocation;
  opensUrl?: string;
  opensDocument?: ExplorerDocumentId;
}

const PROYECTOS_FILES: ExplorerItem[] = [
  { id: 'previdocs', name: 'PreviDocs.docx', type: 'Documento de Word', modified: '15/03/2026', size: '24 KB', iconKind: 'worb', opensDocument: 'previdocs' },
  {
    id: 'gonzai',
    name: 'Gonzai.docx',
    type: 'Documento de Word',
    modified: '02/06/2026',
    size: '18 KB',
    iconKind: 'worb',
    opensDocument: 'gonzai'
  }
];

const DESKTOP_ITEMS: ExplorerItem[] = [
  {
    id: 'historia',
    name: 'Mi Historia.docx',
    type: 'Documento de Word',
    modified: '10/01/2026',
    size: '32 KB',
    iconKind: 'worb',
    opensDocument: 'historia'
  },
  {
    id: 'proyectos-folder',
    name: 'Proyectos FullStack',
    type: 'Carpeta de archivos',
    modified: '02/06/2026',
    size: '—',
    iconKind: 'folder',
    opensLocation: 'proyectos'
  },
  { id: 'galeria', name: 'Galería', type: 'Aplicación de fotos', modified: '22/04/2026', size: '—', iconKind: 'img' },
  { id: 'gadget', name: 'Gadget', type: 'Medidor del sistema', modified: '11/06/2026', size: '128 KB', iconKind: 'gadget' },
  { id: 'habilidades', name: 'Habilidades.xlsx', type: 'Documento de Excel', modified: '18/05/2026', size: '56 KB', iconKind: 'xls' },
  { id: 'hoja-vida', name: 'Hoja de Vida.pdf', type: 'Documento PDF', modified: '12/06/2026', size: '28 KB', iconKind: 'pdf', opensUrl: '/hv/HOJA-DE-VIDA.pdf' },
  { id: 'contacto', name: 'Contacto', type: 'Acceso directo de correo', modified: '11/06/2026', size: '2 KB', iconKind: 'mail' },
  { id: 'papelera', name: 'Papelera de reciclaje', type: 'Papelera de reciclaje', modified: '11/06/2026', size: '—', iconKind: 'bin' }
];

const IMAGENES_FILES: ExplorerItem[] = [
  { id: 'img-semillero', name: 'semillero.webp', type: 'Archivo WebP', modified: '11/06/2026', size: '214 KB', iconKind: 'img' },
  { id: 'img-evento', name: 'evento-ingenieria.webp', type: 'Archivo WebP', modified: '11/06/2026', size: '186 KB', iconKind: 'img' },
  { id: 'img-diplomado', name: 'diplomado-liderazgo.webp', type: 'Archivo WebP', modified: '11/06/2026', size: '205 KB', iconKind: 'img' },
  { id: 'img-practicas', name: '1er-dia-practicas.webp', type: 'Archivo WebP', modified: '11/06/2026', size: '192 KB', iconKind: 'img' },
  { id: 'img-voluntario', name: 'voluntario.webp', type: 'Archivo WebP', modified: '11/06/2026', size: '221 KB', iconKind: 'img' },
  { id: 'img-amigos', name: 'amigos-del-alma.webp', type: 'Archivo WebP', modified: '11/06/2026', size: '189 KB', iconKind: 'img' },
  { id: 'img-team-a', name: 'EL-TEAM-A.webp', type: 'Archivo WebP', modified: '12/06/2026', size: '210 KB', iconKind: 'img' },
  { id: 'img-inicios', name: 'inicios-en-la-u.webp', type: 'Archivo WebP', modified: '11/06/2026', size: '198 KB', iconKind: 'img' }
];

const DISCO_LOCAL_ITEMS: ExplorerItem[] = [
  {
    id: 'c-usuarios',
    name: 'Usuarios',
    type: 'Carpeta de archivos',
    modified: '11/06/2026',
    size: '—',
    iconKind: 'folder',
    opensLocation: 'desktop'
  },
  { id: 'c-program-files', name: 'Archivos de programa', type: 'Carpeta de archivos', modified: '10/06/2026', size: '—', iconKind: 'folder' },
  { id: 'c-program-files-x86', name: 'Archivos de programa (x86)', type: 'Carpeta de archivos', modified: '10/06/2026', size: '—', iconKind: 'folder' },
  { id: 'c-windows', name: 'Windows', type: 'Carpeta de archivos', modified: '11/06/2026', size: '—', iconKind: 'folder' },
  { id: 'c-perflogs', name: 'PerfLogs', type: 'Carpeta de archivos', modified: '05/01/2026', size: '—', iconKind: 'folder' }
];

const LOCATION_ITEMS: Record<ExplorerLocation, ExplorerItem[]> = {
  desktop: DESKTOP_ITEMS,
  proyectos: PROYECTOS_FILES,
  documentos: [],
  imagenes: IMAGENES_FILES,
  'disco-local': DISCO_LOCAL_ITEMS
};

const LOCATION_LABELS: Record<ExplorerLocation, string> = {
  desktop: 'Escritorio',
  proyectos: 'Proyectos FullStack',
  documentos: 'Documentos',
  imagenes: 'Imágenes',
  'disco-local': 'Disco local (C:)'
};

const UP_TARGET: Partial<Record<ExplorerLocation, ExplorerLocation>> = {
  proyectos: 'desktop',
  desktop: 'disco-local',
  documentos: 'disco-local',
  imagenes: 'disco-local'
};

@Component({
  selector: 'app-proyectos-fullstack',
  standalone: true,
  imports: [WorbDocIconComponent],
  templateUrl: './proyectos-fullstack.component.html',
  styleUrl: './proyectos-fullstack.component.css'
})
export class ProyectosFullstackComponent implements OnInit {
  @Input() initialLocation: ExplorerLocation = 'proyectos';
  @Output() documentOpen = new EventEmitter<ExplorerDocumentId>();

  readonly diskUsedGb = 555;
  readonly diskTotalGb = 1000;

  currentLocation: ExplorerLocation = 'proyectos';
  selectedFileId: string | null = null;

  ngOnInit() {
    this.currentLocation = this.initialLocation;
  }

  get currentItems(): ExplorerItem[] {
    return LOCATION_ITEMS[this.currentLocation];
  }

  get currentFolderLabel(): string {
    return LOCATION_LABELS[this.currentLocation];
  }

  get diskUsedPercent(): number {
    return (this.diskUsedGb / this.diskTotalGb) * 100;
  }

  get diskFreeGb(): number {
    return this.diskTotalGb - this.diskUsedGb;
  }

  get showDiskPanel(): boolean {
    return this.currentLocation === 'disco-local';
  }

  get canNavigateUp(): boolean {
    return UP_TARGET[this.currentLocation] !== undefined;
  }

  navigateTo(location: ExplorerLocation) {
    this.currentLocation = location;
    this.selectedFileId = null;
  }

  navigateToDesktop() {
    this.navigateTo('desktop');
  }

  navigateToProyectos() {
    this.navigateTo('proyectos');
  }

  navigateToDocumentos() {
    this.navigateTo('documentos');
  }

  navigateToImagenes() {
    this.navigateTo('imagenes');
  }

  navigateToDiscoLocal() {
    this.navigateTo('disco-local');
  }

  navigateUp() {
    const target = UP_TARGET[this.currentLocation];
    if (target) {
      this.navigateTo(target);
    }
  }

  selectFile(file: ExplorerItem) {
    this.selectedFileId = file.id;
  }

  onFileDoubleClick(file: ExplorerItem) {
    if (file.opensLocation) {
      this.navigateTo(file.opensLocation);
      return;
    }

    if (file.opensUrl) {
      window.open(file.opensUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    if (file.opensDocument) {
      this.documentOpen.emit(file.opensDocument);
    }
  }

  isActiveLocation(location: ExplorerLocation): boolean {
    return this.currentLocation === location;
  }
}
