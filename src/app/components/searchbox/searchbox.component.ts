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
  filteredOptions: string[];
  search: string = '';

  constructor() { }

  ngOnInit() {
  }

  // Search initiated with keybboard event
  searching() {
    this.findInAutoCompleteOptions(this.search);
  }

  // Filter auto complete options list 
  findInAutoCompleteOptions(val: string) {

    this.filteredOptions = null; // Always clear filtered list

    // Clear autocomplete options on empty search
    if (!val) {
      return;
    }

    // Filter autocomplete options
    this.filteredOptions =
      this.autoCompleteOptions.filter(option => option.toLowerCase().substr(0, val.length) === val.toLowerCase());
  }

  onchange() {
    if (this.filteredOptions && this.search === this.filteredOptions[0]) {
      console.log('Single result');
    }
  }


  select(val: string) {
    console.log(val);
    this.search = val;
  }

  // // Auto Complete option has been selected
  // autoCompleteItemSelected(option: string) {
  //   this.search = option;
  //   this.autoCompleteOptionsFiltered = null;
  // }
}
