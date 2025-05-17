import { Component, Input } from '@angular/core';
import { Skeleton } from 'primeng/skeleton';

@Component({
  selector: 'app-skeleton',
  imports: [Skeleton],
  templateUrl: './skeleton.component.html',
  styleUrl: './skeleton.component.scss',
})
export class SkeletonComponent {
  @Input() width: string = '6rem';
  @Input() height: string = '4rem';
}
