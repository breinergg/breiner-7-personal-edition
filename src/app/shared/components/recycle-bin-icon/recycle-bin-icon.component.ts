import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recycle-bin-icon',
  standalone: true,
  templateUrl: './recycle-bin-icon.component.html',
  styleUrl: './recycle-bin-icon.component.css'
})
export class RecycleBinIconComponent {
  @Input({ required: true }) iconId = 'recycle-bin';
}
