import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ShowComponentDirective } from './show-component.directive';

@Component({
  selector: 'app-test-host',
  template: ` <div [appShowComponent]="show">Texto visível</div> `,
  standalone: true,
  imports: [ShowComponentDirective],
})
class TestHostComponent {
  show = true;
}

describe('ShowComponentDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
  });

  it('should show element when appShowComponent is true', () => {
    fixture.componentInstance.show = true;
    fixture.detectChanges();

    const divElement = fixture.debugElement.query(By.css('div'));
    expect(divElement.styles['display']).not.toBe('none');
  });

  it('should hide element when appShowComponent is false', () => {
    fixture.componentInstance.show = false;
    fixture.detectChanges();

    const divElement = fixture.debugElement.query(By.css('div'));
    expect(divElement.styles['display']).toBe('none');
  });
});
