import { Injectable } from '@angular/core';
import { Tag } from '~/app/core/entities/Tag';
import { map } from 'rxjs';
import { HttpAdapterService } from '~/app/core/adapter/httpAdapter/http-adapter.service';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private httpAdapter: HttpAdapterService) {}

  getTagList() {
    return this.httpAdapter.get<Tag[]>({ url: '/tags' }).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
