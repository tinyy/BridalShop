import { Component, OnInit } from '@angular/core';

import { SearchboxComponent } from '../searchbox/searchbox.component';
import { Countries } from '../../models/countries'; // Auto complete options.

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  providers: [SearchboxComponent]
})
export class TopNavComponent implements OnInit {

  public countries: Array<string> = Countries;  
  displayButtonText: string; // set display button with open or close text
  containerWidth: number; // closed by default
  containerMaxDisplayWidth: number = 45;
  containerMinDisplayWidth: number = 5;
  navDisplayed: boolean; // is the nav displayed or not

  constructor() { }

  ngOnInit() {
    // Set default value of button text and closed width
    this.displayButtonText = "Menu";
    this.containerWidth = this.containerMinDisplayWidth;
  }

  // Initiate nav menu toggle
  toggleNav() {
    if (this.containerWidth === this.containerMinDisplayWidth) {
      this.openNav();
    } else { this.closeNav(); }
  }

  // Close the nav menu
  closeNav() {
    this.containerWidth = this.containerMinDisplayWidth;
    this.navDisplayed = false;
  }

  // Open the nav menu
  openNav() {
    this.containerWidth = this.containerMaxDisplayWidth;
    this.navDisplayed = true;
  }

}
