import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { Editor } from '@tiptap/core';

@Directive({
  selector: '[appTiptapEditor]',
})
export class TiptapEditorDirective implements OnInit {
  @Input() appTiptapEditor!: Editor;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.appTiptapEditor?.setOptions({
      element: this.el.nativeElement,
    });

    this.appTiptapEditor?.createNodeViews();
  }
}
