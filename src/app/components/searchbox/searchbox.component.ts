import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';


import { HostListener } from '@angular/core';
import { KeyboardKeys } from '../../models/enums/keyboard-keys';
import { KeyMapper } from '../../components/helpers/key-mapper';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss'],
  providers: [],
})

export class SearchboxComponent implements OnInit {

  @Input('options') options: string[];
  optionsFiltered: string[];
  search: string = '';

  @Input('optionsLimit') optionsLimit: number; // Set limit to autocomplete options displayed
  optionIndex: number = 0; // changes active item in autocomplete options
  originInput: boolean = true; // determines if activeOptionIndex remains at zero
  selected: boolean; // hides autocomplete when option has been selected

  searchForm: FormGroup;

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.searchForm = this._formBuilder.group({
      searchInput: ''
    });

    this.searchForm.valueChanges.subscribe(value => {
      this.searchInitiated();
    });
  }

  searchInitiated() {
    // Always clear the list!
    this.optionsFiltered = null;

    // Clear autocomplete options on empty search
    if (!this.search) {
      this.optionIndex = 0;
      return;
    }
    // Don't recreate filtered options if option has just been selected.
    if (this.selected) {
      this.selected = false;
      return;
    }

    // Filter autocomplete options
    this.optionsFiltered =
      this.options.filter(option => option.toLowerCase().substr(0, this.search.length) === this.search.toLowerCase());
  }

  // Search initiated with keyboard event - Filter auto complete options list 
  @HostListener('window:keydown', ['$event'])
  findInAutoCompleteOptions(event: KeyboardEvent) {
    // Call helper class to map keyboard key
    let direction = KeyMapper.MapKeyBoardKey(event);
    if (direction === KeyboardKeys.KeyNotMapped) { this.optionIndex = 0; return; } // Return if key is not mapped

    // Return if empty
    if (!this.optionsFiltered) {
      return;
    }

    // keep a copy of the autocomplete option by index before amending the activeOptionIndex
    let autoSearch = this.optionsFiltered[this.optionIndex];

    // increment depnending on direction
    if (direction === KeyboardKeys.Down) {

      // dont increment if directly from input
      if (this.originInput) {
        this.originInput = false;
        return;
      }
      // check index and loop to beginning of list if needed.
      if (this.optionIndex === (this.optionsLimit - 1) || this.optionIndex === (this.optionsFiltered.length - 1)) {
        this.optionIndex = 0;
        return;
      }
      this.optionIndex++; // increment to nav down
    } else if (direction === KeyboardKeys.Up) {
      this.optionIndex--;
    } else if (direction === KeyboardKeys.Enter) {
      this.optionSelected(autoSearch);
    }
  }

  // Auto Complete option has been selected
  optionSelected(option: string) {
    this.search = option;
    this.optionsFiltered = null;
    this.originInput = true;
    this.selected = true;
  }

}
