import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAnnotate]'
})
export class AnnotateDirective {

    constructor(el: ElementRef) {
        el.nativeElement.style.backgroundColor = '#ff95d6';
     }

}
