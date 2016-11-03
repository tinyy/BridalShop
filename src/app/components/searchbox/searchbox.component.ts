import { Component, OnInit } from '@angular/core';
import { ElementRef, Renderer } from '@angular/core';

import { Countries } from '../../models/countries'; // Auto complete options.

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
  providers: [],
  host: {
    '(document:click)': 'hideAutoComplete($event)',
  },
})

export class SearchboxComponent implements OnInit {

  autoCompleteOptions: string[] = Countries;
  autoCompleteOptionsFiltered: string[];
  search: string = '';

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) { }

  // Detect click outside the search component
  hideAutoComplete(event) {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.autoCompleteOptionsFiltered = null; // Clear options to hide them
      console.info('Autocomplete options have been hidden'); // TODO: Remove 
    }
    else
      this.findInAutoCompleteOptions(this.search);
  }

  ngOnInit() {
  }

  // Search initiated with keyboard event
  searching(event: KeyboardEvent) {
    this.search = (<HTMLInputElement>event.target).value;

    // Initiate autocomplete 
    this.findInAutoCompleteOptions(this.search);
    console.log(this.search);

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

  // Check key pressed is down by keycode = 40
  checkArrowKey(e: KeyboardEvent) {
    if (e.keyCode === 40) {
      if (this.autoCompleteOptionsFiltered != undefined) {
     
        

        // let firstOption = document.getElementById("firstAutoCompleteOption");
        // firstOption.focus();
        // document.getElementById('autoCompleteOptions').focus();
        // this.vc.nativeElement.focus();
      }
    }
  }



  // Auto Complete option has been selected
  autoCompleteItemSelected(option: string) {
    this.search = option;
    this.autoCompleteOptionsFiltered = null;
  }
}
