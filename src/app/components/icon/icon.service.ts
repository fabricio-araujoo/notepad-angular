import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { registry } from './registry';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    this.registerIcons();
  }

  private registerIcons(): void {
    registry.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        `custom-${icon.name}`,
        this.sanitizer.bypassSecurityTrustResourceUrl(icon.url)
      );
    });
  }
}
