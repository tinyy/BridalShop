import { Component, OnInit } from '@angular/core';

import { SearchboxComponent } from '../searchbox/searchbox.component';
import { Countries } from '../../models/countries'; // Auto complete options.

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  providers: [ SearchboxComponent ]
})
export class TopNavComponent implements OnInit {

  public countries: Array<string> = Countries;  

  constructor() { }

  ngOnInit() {
  }

}
