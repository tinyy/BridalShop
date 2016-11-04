import { Component, OnInit } from '@angular/core';
import { ElementRef, Renderer } from '@angular/core';
import { Directive, Input, ViewChild } from '@angular/core';

import { Countries } from '../../models/countries'; // Auto complete options.

@Directive({
  selector: '[number]'
})
export class NumberDirective {
  @Input() number;

  isEven() {
    return this.number % 2 === 0;
  }
}

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

  tabIndex: number = 0;
  autoSearch: string;
  activeOption: number;

  constructor(private _elementRef: ElementRef, private _renderer: Renderer) { }

  // Detect click outside the search component
  hideAutoComplete(event) {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.autoCompleteOptionsFiltered = null; // Clear options to hide them
      console.info('Autocomplete options have been hidden'); // TODO: Remove 
    }
    // else
    //   this.findInAutoCompleteOptions(this.search);
  }

  ngOnInit() {
  }

  // Search initiated with keyboard event
  searching(event: KeyboardEvent) {
    this.search = (<HTMLInputElement>event.target).value;

    // Initiate autocomplete 
    this.findInAutoCompleteOptions(this.search);
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

  checkTabIndex(): void {
    // if (this.tabIndex < 0) {
    //   this.tabIndex = 0;
    //   this.autoSearch = this.autoCompleteOptionsFiltered[this.tabIndex];
    // }

    this.activeOption = this.tabIndex;

    console.log(this.autoCompleteOptionsFiltered[this.tabIndex]);

    if (this.tabIndex === 4)
      this.tabIndex = 0;
    else
      this.tabIndex++;

  }

  // Check key pressed is down by keycode = 40
  checkArrowKey(e: KeyboardEvent) {
    console.log(e.keyCode);
    if (e.keyCode === 40) {
      if (this.autoCompleteOptionsFiltered != undefined) {
        // let target = e.srcElement.id; // Get element of event source element id
        this.checkTabIndex();

      }

      // up 38
    }
  }



  // Auto Complete option has been selected
  autoCompleteItemSelected(option: string) {
    this.search = option;
    this.autoCompleteOptionsFiltered = null;
  }
}
