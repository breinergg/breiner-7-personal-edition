import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WorbDocIconComponent } from '../../../shared/components/worb-doc-icon/worb-doc-icon.component';
import { LanguageService } from '../../../shared/services/language.service';
import { ExplorerCopy } from '../../../shared/constants/i18n/apps-i18n';
import { isMobileInteraction } from '../../../shared/utils/mobile-interaction';

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

interface ExplorerItemDef {
  id: string;
  typeKey: keyof ExplorerCopy['fileTypes'];
  modified: string;
  size: string;
  iconKind: ExplorerIconKind;
  opensLocation?: ExplorerLocation;
  opensUrl?: string;
  opensDocument?: ExplorerDocumentId;
}

const DESKTOP_ITEM_DEFS: ExplorerItemDef[] = [
  { id: 'historia', typeKey: 'wordDocument', modified: '10/01/2026', size: '32 KB', iconKind: 'worb', opensDocument: 'historia' },
  { id: 'proyectos-folder', typeKey: 'fileFolder', modified: '02/06/2026', size: '—', iconKind: 'folder', opensLocation: 'proyectos' },
  { id: 'galeria', typeKey: 'photoApp', modified: '22/04/2026', size: '—', iconKind: 'img' },
  { id: 'gadget', typeKey: 'systemMeter', modified: '11/06/2026', size: '128 KB', iconKind: 'gadget' },
  { id: 'habilidades', typeKey: 'excelDocument', modified: '18/05/2026', size: '56 KB', iconKind: 'xls' },
  { id: 'hoja-vida', typeKey: 'pdfDocument', modified: '12/06/2026', size: '28 KB', iconKind: 'pdf', opensUrl: '/hv/index.html' },
  { id: 'contacto', typeKey: 'mailShortcut', modified: '11/06/2026', size: '2 KB', iconKind: 'mail' },
  { id: 'papelera', typeKey: 'recycleBin', modified: '11/06/2026', size: '—', iconKind: 'bin' }
];

const PROYECTOS_ITEM_DEFS: ExplorerItemDef[] = [
  { id: 'previdocs', typeKey: 'wordDocument', modified: '15/03/2026', size: '24 KB', iconKind: 'worb', opensDocument: 'previdocs' },
  { id: 'gonzai', typeKey: 'wordDocument', modified: '02/06/2026', size: '18 KB', iconKind: 'worb', opensDocument: 'gonzai' }
];

const IMAGENES_ITEM_DEFS: ExplorerItemDef[] = [
  { id: 'img-semillero', typeKey: 'webpFile', modified: '11/06/2026', size: '214 KB', iconKind: 'img' },
  { id: 'img-evento', typeKey: 'webpFile', modified: '11/06/2026', size: '186 KB', iconKind: 'img' },
  { id: 'img-diplomado', typeKey: 'webpFile', modified: '11/06/2026', size: '205 KB', iconKind: 'img' },
  { id: 'img-practicas', typeKey: 'webpFile', modified: '11/06/2026', size: '192 KB', iconKind: 'img' },
  { id: 'img-voluntario', typeKey: 'webpFile', modified: '11/06/2026', size: '221 KB', iconKind: 'img' },
  { id: 'img-amigos', typeKey: 'webpFile', modified: '11/06/2026', size: '189 KB', iconKind: 'img' },
  { id: 'img-team-a', typeKey: 'webpFile', modified: '12/06/2026', size: '210 KB', iconKind: 'img' },
  { id: 'img-inicios', typeKey: 'webpFile', modified: '11/06/2026', size: '198 KB', iconKind: 'img' }
];

const DISCO_LOCAL_ITEM_DEFS: ExplorerItemDef[] = [
  { id: 'c-usuarios', typeKey: 'fileFolder', modified: '11/06/2026', size: '—', iconKind: 'folder', opensLocation: 'desktop' },
  { id: 'c-program-files', typeKey: 'fileFolder', modified: '10/06/2026', size: '—', iconKind: 'folder' },
  { id: 'c-program-files-x86', typeKey: 'fileFolder', modified: '10/06/2026', size: '—', iconKind: 'folder' },
  { id: 'c-windows', typeKey: 'fileFolder', modified: '11/06/2026', size: '—', iconKind: 'folder' },
  { id: 'c-perflogs', typeKey: 'fileFolder', modified: '05/01/2026', size: '—', iconKind: 'folder' }
];

const LOCATION_DEFS: Record<ExplorerLocation, ExplorerItemDef[]> = {
  desktop: DESKTOP_ITEM_DEFS,
  proyectos: PROYECTOS_ITEM_DEFS,
  documentos: [],
  imagenes: IMAGENES_ITEM_DEFS,
  'disco-local': DISCO_LOCAL_ITEM_DEFS
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

  constructor(readonly lang: LanguageService) {}

  ngOnInit() {
    this.currentLocation = this.initialLocation;
  }

  get explorer() {
    return this.lang.apps.explorer;
  }

  get currentItems(): ExplorerItem[] {
    return this.buildItems(LOCATION_DEFS[this.currentLocation]);
  }

  get currentFolderLabel(): string {
    return this.explorer.locationLabels[this.currentLocation];
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

  get searchPlaceholder(): string {
    return this.explorer.searchIn.replace('{{folder}}', this.currentFolderLabel);
  }

  get diskUsedLabel(): string {
    return this.explorer.gbUsed
      .replace('{{used}}', String(this.diskUsedGb))
      .replace('{{total}}', String(this.diskTotalGb));
  }

  get diskFreeLabel(): string {
    return this.explorer.gbAvailable.replace('{{free}}', String(this.diskFreeGb));
  }

  get statusFreeLabel(): string {
    return this.explorer.gbAvailableOf
      .replace('{{free}}', String(this.diskFreeGb))
      .replace('{{total}}', String(this.diskTotalGb));
  }

  get statusElementsLabel(): string {
    return this.explorer.elements.replace('{{count}}', String(this.currentItems.length));
  }

  private buildItems(defs: ExplorerItemDef[]): ExplorerItem[] {
    const { explorerItemNames, fileTypes } = this.explorer;
    return defs.map((def) => ({
      id: def.id,
      name: explorerItemNames[def.id as keyof typeof explorerItemNames] ?? def.id,
      type: fileTypes[def.typeKey],
      modified: def.modified,
      size: def.size,
      iconKind: def.iconKind,
      opensLocation: def.opensLocation,
      opensUrl: def.opensUrl,
      opensDocument: def.opensDocument
    }));
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

  onFileClick(file: ExplorerItem) {
    this.selectFile(file);

    if (isMobileInteraction()) {
      this.openFile(file);
    }
  }

  onFileDoubleClick(file: ExplorerItem) {
    this.openFile(file);
  }

  private openFile(file: ExplorerItem) {
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
