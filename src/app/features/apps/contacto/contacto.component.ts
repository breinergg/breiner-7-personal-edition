import { Component } from '@angular/core';
import { LanguageService } from '../../../shared/services/language.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  readonly personalEmail = 'breinerftwyts@gmail.com';
  readonly institutionalEmail = 'bmgonzalez@unimagdalena.edu.co';
  readonly phone = '3205061555';

  constructor(readonly lang: LanguageService) {}

  sendPersonalEmail() {
    const copy = this.lang.apps.contacto;
    const subject = encodeURIComponent(copy.mailSubject);
    const body = encodeURIComponent(copy.mailBody);
    window.location.href = `mailto:${this.personalEmail}?subject=${subject}&body=${body}`;
  }

  sendInstitutionalEmail() {
    const copy = this.lang.apps.contacto;
    const subject = encodeURIComponent(copy.mailSubject);
    const body = encodeURIComponent(copy.mailBody);
    window.location.href = `mailto:${this.institutionalEmail}?subject=${subject}&body=${body}`;
  }
}
