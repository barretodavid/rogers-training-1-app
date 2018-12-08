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

import { TextareaComponent } from './textarea.component';

const formControl = new FormControl('Test', Validators.required);

@Component({
  selector: 'rg-fake',
  template:
    '<rg-textarea [formControl]="content" label="Content"></rg-textarea>',
})
class FakeComponent {
  content = formControl;
}

describe('TextareaComponent', () => {
  let component: FakeComponent;
  let fixture: ComponentFixture<FakeComponent>;
  let textarea: HTMLTextAreaElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
      ],
      declarations: [FakeComponent, TextareaComponent],
    })
      .overrideComponent(TextareaComponent, {
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
    textarea = fixture.nativeElement.querySelector('textarea');
    fixture.detectChanges();
  });

  test('Should render', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('When clearing the textarea and losing focus', () => {
    test('Should render an error message', () => {
      component.content.patchValue('');
      fixture.detectChanges();
      textarea.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('When adding a value to the textarea and losing focus', () => {
    test('Should not render an error message', () => {
      component.content.patchValue('Some content');
      fixture.detectChanges();
      textarea.dispatchEvent(new Event('blur'));
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });
});
