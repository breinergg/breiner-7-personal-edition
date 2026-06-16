import { Component } from '@angular/core';

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

  sendPersonalEmail() {
    const subject = encodeURIComponent('Contacto desde Breiner 7');
    const body = encodeURIComponent('Hola Breiner,\n\n');
    window.location.href = `mailto:${this.personalEmail}?subject=${subject}&body=${body}`;
  }

  sendInstitutionalEmail() {
    const subject = encodeURIComponent('Contacto desde Breiner 7');
    const body = encodeURIComponent('Hola Breiner,\n\n');
    window.location.href = `mailto:${this.institutionalEmail}?subject=${subject}&body=${body}`;
  }
}
