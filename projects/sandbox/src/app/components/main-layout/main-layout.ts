import { Component, inject, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlaygroundComponent } from "../playground-component/playground-component";
import { LivePreviewComponent } from "../live-preview-component/live-preview-component";
import { NavigationComponent } from "../navigation-component/navigation-component";
import { InstallationComponent } from "../installation-component/installation-component";
import { UsageComponent } from "../usage-component/usage-component";
import { NotificationService } from '../../services/notification';


@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, PlaygroundComponent, LivePreviewComponent, NavigationComponent, InstallationComponent, UsageComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css',
})
export class MainLayout {
  notificationService = inject(NotificationService);

  constructor() {
    effect(() => {
      console.log('Notification message changed:', this.notificationService.message());
    });
  }
  
}
