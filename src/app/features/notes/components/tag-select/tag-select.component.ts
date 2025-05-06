import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  Input,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { ShowComponentDirective } from '~/app/shared/directives/show-component/show-component.directive';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TagComponent } from '../../../../shared/components/tag/tag.component';

type ITag = {
  id: string;
  label: string;
};

@Component({
  selector: 'app-tag-select',
  imports: [
    CommonModule,
    FormsModule,
    TooltipModule,
    InputComponent,
    TagComponent,
    ShowComponentDirective,
  ],
  templateUrl: './tag-select.component.html',
  styleUrl: './tag-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagSelectComponent {
  // ==== Dependencies ====
  private renderer = inject(Renderer2);

  // ==== Template Refs ====
  @ViewChild('tagSelectContainer') private containerRef!: ElementRef;
  @ViewChild('tagSelectInput') private inputRef!: InputComponent;

  // ==== Inputs ====
  @Input() options: ITag[] = [];

  // ==== Signals ====
  inputValue = signal<string>('');
  selectedTags = signal<ITag[]>([]);
  focused = signal(false);

  // ==== Host Listeners ====
  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const clickedInside = this.containerRef?.nativeElement.contains(
      event.target
    );
    if (!clickedInside) {
      this.blurInput();
    }
  }

  // ==== Effects ====
  readonly autoFocusEffect = effect(() => {
    if (this.focused() && this.inputRef) {
      setTimeout(() => this.inputRef?.focus(), 0);
    }
  });

  // ==== Public Methods ====
  handleFocusComponent() {
    this.focused.set(true);
  }

  handleSelectTag(tag: ITag) {
    const alreadySelected = this.selectedTags().some(
      (t) => t.label === tag.label
    );
    if (alreadySelected) return;

    this.selectedTags.set([...this.selectedTags(), tag]);
    this.inputValue.set('');
  }

  handleRemoveTag(tag: ITag) {
    const updated = this.selectedTags().filter((t) => t.id !== tag.id);
    this.selectedTags.set(updated);
  }

  handleCreateTag() {
    const newTag: ITag = {
      id: (this.selectedTags().length + 1).toString(),
      label: this.inputValue(),
    };

    this.options.push(newTag);
    this.selectedTags.set([...this.selectedTags(), newTag]);
    this.inputValue.set('');
  }

  getFilteredOptions(): ITag[] {
    if (!this.inputValue()) return this.options;
    return this.options.filter((option) =>
      option.label.toLowerCase().includes(this.inputValue().toLowerCase())
    );
  }

  tagAlreadyExists(): boolean {
    return !!this.options.find(
      (o) => o.label.toLowerCase() === this.inputValue().toLowerCase()
    );
  }

  // ==== Private Methods ====
  private blurInput() {
    this.inputValue.set('');
    this.focused.set(false);
  }
}
