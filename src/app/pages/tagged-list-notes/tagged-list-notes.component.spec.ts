import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggedListNotesComponent } from './tagged-list-notes.component';

describe('TaggedListNotesComponent', () => {
  let component: TaggedListNotesComponent;
  let fixture: ComponentFixture<TaggedListNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaggedListNotesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaggedListNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
