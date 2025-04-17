import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowComponent]',
  standalone: true,
})
export class ShowComponentDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @Input() set appShowComponent(shouldShow: boolean) {
    this.renderer.setStyle(
      this.el.nativeElement,
      'display',
      shouldShow ? '' : 'none'
    );
  }
}
