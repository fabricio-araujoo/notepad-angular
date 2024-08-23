import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
import { Tag } from '~/app/types/Tag';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private httpService: HttpService) {}

  getTagList() {
    return this.httpService.get<Tag[]>({ url: '/tags' }).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
