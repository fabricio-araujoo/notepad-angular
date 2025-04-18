import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

export interface MenuItem {
  label: string;
  icon?: string; // Nome do ícone opcional
  disabled?: boolean; // Controla se o item está desabilitado
  visible?: boolean; // Controla se o item está desabilitado
  ref?: HTMLElement; // Referência opcional para o item
  action?: VoidFunction; // Callback ou dado associado ao item
}

@Component({
  selector: 'app-menu',
  imports: [CommonModule, MatMenuModule, MatIconModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input() items: MenuItem[] = [];

  @Output() selected = new EventEmitter<MenuItem>(); // Emite quando um item do menu é clicado

  onMenuItemClick(event: MouseEvent, item: MenuItem): void {
    if (!item.disabled) {
      this.selected.emit(item); // Emite o item clicado
    }
  }
}
