import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-worb-doc-icon',
  standalone: true,
  templateUrl: './worb-doc-icon.component.html'
})
export class WorbDocIconComponent {
  @Input({ required: true }) iconId = 'worb';
}
