import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { IconComponent } from '../icon/icon.component';

type ButtonVariant = 'default' | 'primary' | 'link' | 'text';

type ButtonType = 'button' | 'submit';

type ButtonSize = 'small' | 'medium' | 'large';

type ButtonJustify = 'left' | 'center' | 'right';

@Component({
  selector: 'app-button',
  imports: [CommonModule, MatIconModule, IconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements AfterViewInit {
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('button', { static: false })
  button!: ElementRef;

  @ViewChild('textContainer', { static: false })
  textContainer?: ElementRef;

  @Input() suffixIcon!: string;
  @Input() variant?: ButtonVariant = 'default';
  @Input() size?: ButtonSize = 'medium';
  @Input() type?: ButtonType = 'button';
  @Input() justify?: ButtonJustify = 'center';
  @Input() disabled?: boolean = false;
  @Input() block?: boolean = false;

  isIconOnly = false;

  get buttonClass() {
    return {
      'button--primary': this.variant === 'primary',
      'button--link': this.variant === 'link',
      'button--text': this.variant === 'text',
      'button--small': this.size === 'small',
      'button--large': this.size === 'large',
      'button--left': this.justify === 'left',
      'button--right': this.justify === 'right',
      'button--block': this.block,
      'button--disabled': this.disabled,
      'button--icon-only': this.isIconOnly,
    };
  }

  private checkContent() {
    const hasContent =
      this.textContainer?.nativeElement?.textContent?.trim()?.length > 0;
    this.isIconOnly = !hasContent;

    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this.checkContent();
  }
}
