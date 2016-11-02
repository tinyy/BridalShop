import { Component, OnInit } from '@angular/core';

import { SearchboxComponent } from '../searchbox/searchbox.component';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  providers: [ SearchboxComponent ]
})
export class TopNavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
