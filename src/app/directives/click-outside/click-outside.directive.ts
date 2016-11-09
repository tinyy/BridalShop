import { Directive, ElementRef, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appClickoutside]'
})
export class ClickoutsideDirective {

@Output() clickOutside = new EventEmitter();

  constructor(private _el: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this._el.nativeElement.contains(targetElement);
    if (!clickedInside) {
    console.log('hide');
      
    }
  }

}
