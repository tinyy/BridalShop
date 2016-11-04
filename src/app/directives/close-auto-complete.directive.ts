import { Directive, HostBinding, HostListener } from '@angular/core';


@Directive({
  selector: '[appCloseAutoComplete]'
})
export class CloseAutoCompleteDirective {

   @HostBinding('attr.role') role = 'document';
  @HostListener('click') onClick() {
    
  }

}
