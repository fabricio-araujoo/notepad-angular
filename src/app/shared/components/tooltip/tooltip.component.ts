import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-tooltip',
  imports: [CommonModule, Tooltip],
  templateUrl: './tooltip.component.html',
  styleUrl: './tooltip.component.scss',
})
export class TooltipComponent {
  @Input() text: string = '';
  @Input() helper: string = '';
  @Input() placement?: 'right' | 'left' | 'top' | 'bottom' | string = '';
}
