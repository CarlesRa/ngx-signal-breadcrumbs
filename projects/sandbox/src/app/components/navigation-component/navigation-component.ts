import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CardComponent } from "../shared/card-component/card-component";

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, RouterLinkActive, CardComponent],
  templateUrl: './navigation-component.html',
  styleUrl: './navigation-component.css',
})
export class NavigationComponent {

}
