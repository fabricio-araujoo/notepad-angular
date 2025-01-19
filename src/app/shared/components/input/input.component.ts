import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

type InputType = 'text' | 'number' | 'email' | 'password';

type InputSize = 'normal' | 'large';

type InputVariant = 'outlined' | 'borderless';

@Component({
  selector: 'app-input',
  standalone: true,
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
  @Input() id: string = '';
  @Input() type: InputType = 'text';
  @Input() label?: string;
  @Input() placeholder?: string = '';
  @Input() error?: string;
  @Input() showError?: boolean = false;
  @Input() full?: boolean = false;
  @Input() size?: InputSize = 'normal';
  @Input() variant?: InputVariant = 'outlined';

  // Output para eventos no modo independente
  @Output() inputChange = new EventEmitter<string>();
  @Output() inputFocus = new EventEmitter<string>();

  value: string | null = null; // Valor do input

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  // Métodos do ControlValueAccessor (para formulários reativos)
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Métodos para interação com o input
  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;

    this.value = target.value;
    this.onChange(this.value); // Atualiza o valor no formulário reativo
    this.inputChange.emit(this.value); // Emite o evento no modo independente
  }

  onBlur(): void {
    this.onTouched(); // Marca como "tocado" no formulário reativo
  }

  onFocus(): void {
    this.inputFocus.emit();
  }

  getClasses() {
    return {
      'input__field--full': this.full,
    };
  }
}
