import { Component } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'app-mi-historia',
  standalone: true,
  templateUrl: './mi-historia.component.html',
  styleUrl: './mi-historia.component.css'
})
export class MiHistoriaComponent {
  constructor(readonly lang: LanguageService) {}
}
