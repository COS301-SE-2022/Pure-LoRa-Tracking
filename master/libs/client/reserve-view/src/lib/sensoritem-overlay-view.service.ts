import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SensorDeviceViewComponent } from '@master/client/shared-ui/components-ui';

@Injectable({
  providedIn: 'root'
})
export class SensoritemOverlayViewService {

  constructor(private overlay:Overlay) { }

  open(){
    const overlayReference = this.overlay.create();
    const itemPortal = new ComponentPortal(SensorDeviceViewComponent);
    overlayReference.attach(itemPortal);
  }
}
