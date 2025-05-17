import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Editor } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import StarterKit from '@tiptap/starter-kit';
import { NgxTiptapModule } from 'ngx-tiptap';
import { TiptapEditorDirective } from '~/app/shared/directives/tiptap-editor/tiptap-editor.directive';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, NgxTiptapModule, TiptapEditorDirective],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('titleRef', { static: true })
  titleRef!: ElementRef<HTMLDivElement>;
  title = signal('Título da Página');

  editor!: Editor;

  ngOnInit() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: 'Digite algo...',
        }),
      ],
      content: '<p>Comece a editar sua página</p>',
    });
  }

  ngAfterViewInit() {
    this.titleRef.nativeElement.innerText = this.title();
  }

  ngOnDestroy() {
    this.editor?.destroy();
  }

  onTitleInput(event: Event) {
    const text = (event.target as HTMLElement).innerText;
    this.title.set(text);
  }
}
