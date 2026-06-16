import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  constructor(readonly lang: LanguageService) {}
  @Input() titulo: string = '';
  @Input() mensaje: string = '';
  @Input() mostrarCancelar: boolean = true;

  @Output() onAceptar = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  aceptar() {
    this.onAceptar.emit();
  }

  cancelar() {
    this.onCancelar.emit();
  }
}
