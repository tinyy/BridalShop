import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  // Search initiated with keybboard event
  searching(event: KeyboardEvent) {
    this.search = (<HTMLInputElement>event.target).value;

    this.findInAutoCompleteOptions(this.search);

    // TODO: Debugging only - remove.
    if (this.autoCompleteOptionsFiltered) {
      console.log(this.autoCompleteOptionsFiltered.length + ' - available autocomplete options');
    }
  }

  // Filter auto complete options list 
  findInAutoCompleteOptions(val: string) {

    // Clear autocomplete options on empty search
    if (!val) {
      this.autoCompleteOptionsFiltered = null;
      return;
    }

    // Filter autocomplete options.
    let firstLetter = val.substr(0);

    this.autoCompleteOptionsFiltered =
      this.autoCompleteOptions.filter(option => option.toLowerCase().substr(0, val.length) === val);
  }

  // Auto Complete option has been selected
  autoCompleteItemSelected(option: string) {
    this.search = option;
    this.findInAutoCompleteOptions(option);
  }
}
