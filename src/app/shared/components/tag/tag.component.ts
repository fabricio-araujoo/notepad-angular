import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tag',
  imports: [MatIcon],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  @Input() close?: boolean;

  @Output() closeTag = new EventEmitter<void>();

  handleCloseTag() {
    this.closeTag.emit();
  }
}
