import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  HostListener,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { ShowComponentDirective } from '~/app/shared/directives/show-component/show-component.directive';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { TagComponent } from '../../../../shared/components/tag/tag.component';

interface Tag {
  id: string;
  label: string;
}

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
  @ViewChild('tagSelectContainer')
  tagSelectContainerRef!: ElementRef;

  @ViewChild('tagSelectInput')
  tagSelectInputRef!: InputComponent;

  inputValue = '';

  selectedTags = signal<Tag[]>([]);
  focused = signal<boolean>(false);

  options: Tag[] = [
    { id: '1', label: 'Desenvolvimento' },
    { id: '2', label: 'Diversão' },
    { id: '3', label: 'Importante' },
  ];

  constructor(private renderer: Renderer2) {
    effect(() => {
      if (this.focused() && this.tagSelectInputRef) {
        setTimeout(() => {
          this.tagSelectInputRef?.focus();
        });
      }
    });
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const clickedInside = this.tagSelectContainerRef?.nativeElement.contains(
      event.target
    );

    if (!clickedInside) {
      this.inputValue = '';
      this.focused.set(false);
    }
  }

  handleFocusComponent() {
    this.focused.set(true);
  }

  handleSelectedTag(tag: Tag) {
    const selectedTag = this.selectedTags().find(
      (item) => item.label === tag.label
    );

    if (selectedTag) {
      return;
    }

    this.selectedTags.set([...this.selectedTags(), tag]);

    this.inputValue = '';
  }

  handleCreateTag() {
    const newTagId = this.selectedTags().length + 1;

    const _tag: Tag = {
      id: newTagId.toString(),
      label: this.inputValue,
    };

    this.options.push(_tag);

    this.selectedTags.set([...this.selectedTags(), _tag]);
  }

  handleRemoveTag(tag: Tag) {
    const arr = this.selectedTags().filter((item) => item.id !== tag.id);

    this.selectedTags.set([...arr]);
  }

  filteredOptions() {
    if (!this.inputValue) {
      return this.options;
    }

    return this.options.filter((option) =>
      option.label.toLowerCase().includes(this.inputValue.toLowerCase())
    );
  }

  matchTagLabel() {
    return this.filteredOptions().find(
      (item) => item.label.toLowerCase() === this.inputValue.toLowerCase()
    );
  }
}
