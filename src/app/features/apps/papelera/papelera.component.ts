import { Component } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'app-papelera',
  standalone: true,
  templateUrl: './papelera.component.html',
  styleUrl: './papelera.component.css'
})
export class PapeleraComponent {
  readonly itemCount = 0;

  constructor(readonly lang: LanguageService) {}

  get itemsCountLabel(): string {
    return this.lang.apps.papelera.itemsCount.replace('{{count}}', String(this.itemCount));
  }
}
