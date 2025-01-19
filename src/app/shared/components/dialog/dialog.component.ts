import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogActions],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements AfterContentInit {
  @ContentChild('footer', { read: TemplateRef })
  footerTemplate?: TemplateRef<unknown>;

  hasFooter = false;

  ngAfterContentInit() {
    this.hasFooter = !!this.footerTemplate;
  }
}
