import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Editor, JSONContent } from '@tiptap/core';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import StarterKit from '@tiptap/starter-kit';
import { NgxTiptapModule } from 'ngx-tiptap';
import { ButtonComponent } from '../button/button.component';
import { TooltipComponent } from '../tooltip/tooltip.component';

@Component({
  selector: 'app-text-editor',
  imports: [NgxTiptapModule, TooltipComponent, ButtonComponent],
  templateUrl: './text-editor.component.html',
  styleUrl: './text-editor.component.scss',
})
export class TextEditorComponent implements OnInit, OnDestroy, AfterViewInit {
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('editorContainer', { static: false })
  editorContainer!: ElementRef;

  @Input() placeholder: string = 'Digite aqui...';
  @Input() initialContent: string = '';

  @Output() changed = new EventEmitter<JSONContent>();

  protected editor!: Editor;

  protected menu: {
    icon: string;
    tooltip: {
      text: string;
      helper: string;
    };
    click: () => void;
  }[] = [
    {
      icon: 'bold',
      tooltip: {
        text: 'Negrito',
        helper: 'Ctrl + B',
      },
      click: () => {
        this.editor.chain().focus().toggleBold().run();
      },
    },
    {
      icon: 'italic',
      tooltip: {
        text: 'Itálico',
        helper: 'Ctrl + I',
      },
      click: () => {
        this.editor.chain().focus().toggleItalic().run();
      },
    },
    {
      icon: 'underline',
      tooltip: {
        text: 'Sublinhado',
        helper: 'Ctrl + U',
      },
      click: () => {
        this.editor.chain().focus().toggleUnderline().run();
      },
    },
    {
      icon: 'strike',
      tooltip: {
        text: 'Tachado',
        helper: 'Ctrl + Shift + S',
      },
      click: () => {
        this.editor.chain().focus().toggleStrike().run();
      },
    },
    {
      icon: 'code',
      tooltip: {
        text: 'Código',
        helper: 'Ctrl + E',
      },
      click: () => {
        this.editor.chain().focus().toggleCode().run();
      },
    },
  ];

  ngOnInit(): void {
    this.editor = new Editor({
      content: this.initialContent,
      editable: true,
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: this.placeholder,
        }),
        Underline,
      ],
      onUpdate: ({ editor }) => {
        this.changed.emit(editor.getJSON());
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
