import { Component, Input } from '@angular/core';

@Component({
  selector: 'master-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.scss'],
})
export class DisplayMessageComponent {
  @Input() message = "";
  @Input() msgColor = "#FFF";

}
