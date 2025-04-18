import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type InputType = 'text' | 'number' | 'email' | 'password';

type InputSize = 'normal' | 'large';

type InputVariant = 'outlined' | 'borderless';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements ControlValueAccessor {
  @ViewChild('input', { static: true }) inputRef?: ElementRef<HTMLInputElement>;

  @Input() id: string = '';
  @Input() type: InputType = 'text';
  @Input() label?: string;
  @Input() error?: string;
  @Input() showError?: boolean;
  @Input() full?: boolean;
  @Input() placeholder?: string = '';
  @Input() size?: InputSize = 'normal';
  @Input() variant?: InputVariant = 'outlined';

  // Output para eventos no modo independente
  @Output() changed = new EventEmitter<string>();
  @Output() focused = new EventEmitter<FocusEvent>();
  @Output() blured = new EventEmitter<FocusEvent>();

  value: string | null = null; // Valor do input

  private handleChange: (value: string) => void = () => {};
  private handleTouched: () => void = () => {};

  // Métodos do ControlValueAccessor (para formulários reativos)
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.handleChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.handleTouched = fn;
  }

  // Métodos para interação com o input
  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.value = target.value;
    this.handleChange(this.value); // Atualiza o valor no formulário reativo
    this.changed.emit(this.value); // Emite o evento no modo independente
  }

  handleBlur(): void {
    this.handleTouched(); // Marca como "tocado" no formulário reativo
  }

  handleFocus(): void {
    this.focused.emit();
  }

  focus() {
    this.inputRef?.nativeElement?.focus();
  }
}
