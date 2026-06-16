import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-start-menu-app-icon',
  standalone: true,
  templateUrl: './start-menu-app-icon.component.html',
  styleUrl: './start-menu-app-icon.component.css'
})
export class StartMenuAppIconComponent {
  @Input({ required: true }) icon!: string;
}
