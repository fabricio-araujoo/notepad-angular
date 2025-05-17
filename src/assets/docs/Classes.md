## Classes

Tópico de documentação das classes do projeto

### Componentes

```
@Decorator()
export default Component {
    // ==== Dependencies ====
    private injectable = inject(InjectableClass);

    // ==== Template Refs ====
    @ViewChild('container') private container!: ElementRef;

    // ==== Inputs ====
    @Input() input: string = '';

    // ==== Signals ====
    signal = signal<string>('');

    // ==== Host Listeners ====
    @HostListener('document:click', ['$event'])
    handleDocumentClick(event: MouseEvent) {}

    // ==== Effects ====
    readonly autoFocusEffect = effect(() => {});

    // ==== Protected Methods ====
    method() {}

    // ==== Public Methods ====
    method() {}

    // ==== Private Methods ====
    private privateMethod() {}
}
```
