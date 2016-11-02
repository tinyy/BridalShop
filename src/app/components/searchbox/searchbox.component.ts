import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';

import { Countries } from '../../models/countries'; // Auto complete options.

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {


  autoCompleteOptions: string[] = Countries;
  autoCompleteOptionsFiltered: string[];
  search: string = '';

  @ViewChild('autoComplete') vc;


  constructor() { }

  ngOnInit() {
  }

  // Search initiated with keybboard event
  searching(event: KeyboardEvent) {
    this.search = (<HTMLInputElement>event.target).value;

    this.findInAutoCompleteOptions(this.search);

    // TODO: Debugging only - remove.
    console.log(this.search);
    if (this.autoCompleteOptionsFiltered) {
      console.log(this.autoCompleteOptionsFiltered.length + ' - available autocomplete options');
    }
  }

  // Check key pressed is down by keycode = 40
  checkArrowKey(e: KeyboardEvent) {
    if (e.keyCode === 40) {
      // User has pressed down - focus on the autocomplete list
      if (this.autoCompleteOptionsFiltered != undefined) {
        document.getElementById('autoCompleteOptions').focus();
        this.vc.nativeElement.focus();
      }
    }
  }

  // Filter auto complete options list 
  findInAutoCompleteOptions(val: string) {
    // Clear autocomplete options on empty search
    if (!val) {
      this.autoCompleteOptionsFiltered = null;
      return;
    }

    // Filter autocomplete options
    this.autoCompleteOptionsFiltered =
      this.autoCompleteOptions.filter(option => option.toLowerCase().substr(0, val.length) === val.toLowerCase());
  }

  // Auto Complete option has been selected
  autoCompleteItemSelected(option: string) {
    this.search = option;
    this.autoCompleteOptionsFiltered = null;
  }
}
