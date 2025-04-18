import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Editor } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { NgxTiptapModule } from 'ngx-tiptap';
import { IconComponent } from '../icon/icon.component';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-text-editor',
  imports: [NgxTiptapModule, TooltipComponent, IconComponent],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
})
export class TextEditorComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('editorContainer', { static: false }) editorContainer!: ElementRef;

  @Input() placeholder: string = 'Digite aqui...';
  @Input() initialContent: string = '';

  @Output() changed = new EventEmitter<string>();

  editor!: Editor;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Configuração inicial do editor
    this.editor = new Editor({
      content: this.initialContent, // Conteúdo inicial passado pelo input
      editable: true,
      extensions: [
        StarterKit, // Funções básicas como negrito, itálico, listas
        Placeholder.configure({
          placeholder: this.placeholder,
        }),
        Underline,
      ],
      onUpdate: ({ editor }) => {
        // Emite o conteúdo sempre que o editor for alterado
        this.changed.emit(editor.getHTML());
      },
    });
  }

  ngAfterViewInit(): void {
    // Inicializa o editor assim que o componente for montado no DOM
    this.editor.setOptions({
      element: this.editorContainer.nativeElement,
    });

    // Necessário para garantir que o editor seja renderizado corretamente após a inicialização
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    // Libera os recursos quando o componente for destruído
    this.editor.destroy();
  }
}
