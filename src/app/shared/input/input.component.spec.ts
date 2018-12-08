import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ReactiveFormsModule,
  FormControl,
  NgControl,
  Validators,
} from '@angular/forms';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { InputComponent } from './input.component';

const formControl = new FormControl('Test', Validators.required);
@Component({
  selector: 'rg-fake',
  template: '<rg-input [formControl]="title" label="Title"></rg-input>',
})
class FakeComponent {
  title = formControl;
}

describe('InputComponent', () => {
  let component: FakeComponent;
  let fixture: ComponentFixture<FakeComponent>;
  let input: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
      declarations: [FakeComponent, InputComponent],
    })
      .overrideComponent(InputComponent, {
        set: {
          providers: [
            {
              provide: NgControl,
              useValue: formControl,
            },
          ],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakeComponent);
    component = fixture.componentInstance;
    input = fixture.nativeElement.querySelector('input');
    fixture.detectChanges();
  });

  test('Should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('When clearing the input and losing focus', () => {
    test('Should render an error message', () => {
      component.title.patchValue('');
      fixture.detectChanges();
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('When adding a value to the input and losing focus', () => {
    test('Should not render an error message', () => {
      component.title.patchValue('hey baby');
      fixture.detectChanges();
      input.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });
});
