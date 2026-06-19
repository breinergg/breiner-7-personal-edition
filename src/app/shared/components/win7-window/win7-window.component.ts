import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { RecycleBinIconComponent } from '../recycle-bin-icon/recycle-bin-icon.component';

export type Win7WindowIcon = 'word' | 'mail' | 'folder' | 'excel' | 'photo' | 'bin' | 'generic';

const TASKBAR_HEIGHT_DESKTOP = 40;
const TASKBAR_HEIGHT_MOBILE = 36;
const VIEWPORT_MARGIN = 8;
const MIN_WINDOW_WIDTH = 320;
const MIN_WINDOW_HEIGHT = 240;

@Component({
  selector: 'app-win7-window',
  standalone: true,
  imports: [RecycleBinIconComponent],
  templateUrl: './win7-window.component.html',
  styleUrl: './win7-window.component.css'
})
export class Win7WindowComponent implements OnInit, OnChanges, OnDestroy {
  constructor(readonly lang: LanguageService) {}

  @Input({ required: true }) title = '';
  @Input() icon: Win7WindowIcon = 'generic';
  @Input() left = 120;
  @Input() top = 48;
  @Input() width = 720;
  @Input() height = 520;
  @Input() zIndex = 100;

  positionLeft = 120;
  positionTop = 48;
  displayWidth = 720;
  displayHeight = 520;

  @Output() closed = new EventEmitter<void>();
  @Output() minimized = new EventEmitter<void>();
  @Output() focused = new EventEmitter<void>();
  @Output() positionChange = new EventEmitter<{ left: number; top: number }>();

  private isDragging = false;
  private dragOffsetX = 0;
  private dragOffsetY = 0;
  private readonly onViewportResize = () => this.fitToViewport(false);

  ngOnInit() {
    this.fitToViewport(true);
    window.addEventListener('resize', this.onViewportResize);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.onViewportResize);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isDragging) {
      return;
    }

    if (changes['left']) {
      this.positionLeft = this.left;
    }

    if (changes['top']) {
      this.positionTop = this.top;
    }

    if (changes['width'] || changes['height'] || changes['left'] || changes['top']) {
      this.fitToViewport(true);
    }
  }

  private getTaskbarHeight(): number {
    return window.innerWidth <= 768 ? TASKBAR_HEIGHT_MOBILE : TASKBAR_HEIGHT_DESKTOP;
  }

  private getWorkAreaHeight(): number {
    return Math.max(MIN_WINDOW_HEIGHT, window.innerHeight - this.getTaskbarHeight() - VIEWPORT_MARGIN);
  }

  private getWorkAreaWidth(): number {
    return Math.max(MIN_WINDOW_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2);
  }

  private getMaxTop(): number {
    return Math.max(
      VIEWPORT_MARGIN,
      window.innerHeight - this.getTaskbarHeight() - this.displayHeight - VIEWPORT_MARGIN
    );
  }

  private fitToViewport(resetPosition: boolean) {
    const workAreaWidth = this.getWorkAreaWidth();
    const workAreaHeight = this.getWorkAreaHeight();

    this.displayWidth = Math.max(MIN_WINDOW_WIDTH, Math.min(this.width, workAreaWidth));
    this.displayHeight = Math.max(MIN_WINDOW_HEIGHT, Math.min(this.height, workAreaHeight));

    if (resetPosition) {
      this.positionLeft = this.left;
      this.positionTop = this.top;
    }

    this.clampPosition();
  }

  private clampPosition() {
    const maxLeft = Math.max(VIEWPORT_MARGIN, window.innerWidth - this.displayWidth - VIEWPORT_MARGIN);
    const maxTop = this.getMaxTop();

    this.positionLeft = Math.max(VIEWPORT_MARGIN, Math.min(this.positionLeft, maxLeft));
    this.positionTop = Math.max(VIEWPORT_MARGIN, Math.min(this.positionTop, maxTop));

    if (this.positionTop + this.displayHeight > window.innerHeight - this.getTaskbarHeight() - VIEWPORT_MARGIN) {
      this.positionTop = Math.max(
        VIEWPORT_MARGIN,
        window.innerHeight - this.getTaskbarHeight() - this.displayHeight - VIEWPORT_MARGIN
      );
    }
  }

  onWindowPointerDown() {
    this.focused.emit();
  }

  onTitlePointerDown(event: PointerEvent) {
    if (event.button !== 0) {
      return;
    }

    if ((event.target as HTMLElement).closest('.win7-window-controls')) {
      return;
    }

    event.preventDefault();
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    this.focused.emit();
    this.isDragging = true;
    this.dragOffsetX = event.clientX - this.positionLeft;
    this.dragOffsetY = event.clientY - this.positionTop;
  }

  onTitlePointerMove(event: PointerEvent) {
    if (!this.isDragging) {
      return;
    }

    this.positionLeft = event.clientX - this.dragOffsetX;
    this.positionTop = event.clientY - this.dragOffsetY;
    this.clampPosition();
  }

  onTitlePointerUp(event: PointerEvent) {
    if (!this.isDragging) {
      return;
    }

    (event.currentTarget as HTMLElement).releasePointerCapture(event.pointerId);
    this.isDragging = false;
    this.positionChange.emit({ left: this.positionLeft, top: this.positionTop });
  }

  onMinimize(event: MouseEvent) {
    event.stopPropagation();
    this.minimized.emit();
  }

  onClose(event: MouseEvent) {
    event.stopPropagation();
    this.closed.emit();
  }
}
