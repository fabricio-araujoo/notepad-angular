import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tag',
  imports: [MatIcon, CommonModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  @Input() close?: boolean;

  @Output() closed = new EventEmitter<void>();

  onClose() {
    this.closed.emit();
  }
}
