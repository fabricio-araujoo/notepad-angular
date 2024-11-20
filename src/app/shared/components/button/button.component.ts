import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

type ButtonVariant = 'default' | 'primary' | 'link' | 'text';

type ButtonType = 'button' | 'submit';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements AfterViewInit {
  @ViewChild('button', { static: false }) button!: ElementRef;

  @Input() variant?: ButtonVariant = 'default'; // Define estilo
  @Input() type?: ButtonType = 'button';
  @Input() disabled?: boolean = false;
  @Input() block?: boolean = false; // Ocupar todo o espaço
  @Input() suffixIcon?: string;

  isIconOnly = false;

  constructor(private cdr: ChangeDetectorRef) {}

  // Semelhante ao onBeforeMount do Vue
  ngAfterViewInit(): void {
    if (this.suffixIcon) {
      const contentNodes = this.button.nativeElement.childNodes;
      console.log({ contentNodes });

      this.isIconOnly = !Array.from(contentNodes).some((node: unknown) => {
        const _node = node as ChildNode;

        if (
          _node.nodeType === Node.ELEMENT_NODE &&
          _node.nodeName === 'MAT-ICON'
        ) {
          return false;
        }

        return (
          _node.nodeType === Node.TEXT_NODE ||
          _node.nodeType === Node.ELEMENT_NODE
        );
      });

      this.cdr.detectChanges();
    }
  }
}
