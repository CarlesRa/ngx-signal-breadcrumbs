import { Component, inject } from '@angular/core';
import { IconName, ICON_PATHS } from 'ngx-signal-breadcrumbs';
import { CardComponent } from "../shared/card-component/card-component";
import { StoreService } from '../../services/store';
import { ControlComponent } from "../shared/control-component/control-component";
import { DeviceDetector } from '../../services/device-detector';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-playground',
  imports: [CardComponent, NgTemplateOutlet, ControlComponent],
  templateUrl: './playground-component.html',
  styleUrl: './playground-component.css',
})
export class PlaygroundComponent {
  separators: IconName[] =
    (Object.keys(ICON_PATHS) as IconName[]).filter(icon => icon !== 'home');

  store = inject(StoreService);
  deviceDetector = inject(DeviceDetector);
}
