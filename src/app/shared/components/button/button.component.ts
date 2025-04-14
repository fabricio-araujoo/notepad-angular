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
    imports: [CommonModule, MatIconModule],
    templateUrl: './button.component.html',
    styleUrl: './button.component.scss'
})
export class ButtonComponent implements AfterViewInit {
  @ViewChild('button', { static: false }) button!: ElementRef;
  @ViewChild('textContainer', { static: false }) textContainer?: ElementRef;

  @Input() variant?: ButtonVariant = 'default'; // Define estilo
  @Input() type?: ButtonType = 'button';
  @Input() disabled?: boolean = false;
  @Input() block?: boolean = false; // Ocupar todo o espaço
  @Input() suffixIcon?: string;

  isIconOnly = false;

  constructor(private cdr: ChangeDetectorRef) {}

  // Semelhante ao onBeforeMount do Vue
  ngAfterViewInit() {
    this.checkContent();
  }

  private checkContent() {
    // Verifica se o span tem conteúdo ou não
    const hasContent =
      this.textContainer?.nativeElement?.textContent?.trim()?.length > 0;
    this.isIconOnly = !hasContent;

    // Solicita ao Angular que verifique mudanças se necessário
    this.cdr.detectChanges();
  }
}
