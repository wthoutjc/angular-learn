import { Component } from '@angular/core';

@Component({
  selector: 'app-uncommon-page',
  templateUrl: './uncommon-page.component.html',
  styles: ``,
})
export class UncommonPageComponent {
  name = 'Juan';
  gender: 'male' | 'female' = 'male';

  inviteMap = {
    male: 'invitarlo',
    female: 'invitarla',
  };

  changeClient() {
    this.name = 'Ana';
    this.gender = 'female';
  }
}
