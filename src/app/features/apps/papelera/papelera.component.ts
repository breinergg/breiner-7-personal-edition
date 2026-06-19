import { Component } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';
import { RecycleBinIconComponent } from '../../../shared/components/recycle-bin-icon/recycle-bin-icon.component';

@Component({
  selector: 'app-papelera',
  standalone: true,
  imports: [RecycleBinIconComponent],
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
