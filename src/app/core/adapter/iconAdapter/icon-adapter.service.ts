import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { registry } from './registry';

@Injectable({
  providedIn: 'root',
})
export class IconAdapterService {
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
