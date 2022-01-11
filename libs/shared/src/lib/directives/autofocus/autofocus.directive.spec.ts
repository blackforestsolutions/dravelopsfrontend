import { AutofocusDirective } from './autofocus.directive';
import { MatInput, MatInputModule } from '@angular/material/input';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'dravelopssharedfrontend-test',
  template: '<input type="text" matInput dravelopssharedfrontendAutofocus id="testInput">'
})
class TestComponent {
}

describe('AutofocusDirective', () => {
  let testFixture: ComponentFixture<TestComponent>;

  let directiveUnderTest: AutofocusDirective;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, AutofocusDirective],
      providers: [MatInput],
      imports: [MatInputModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    testFixture = TestBed.createComponent(TestComponent);
    directiveUnderTest = testFixture.debugElement.query(By.directive(AutofocusDirective)).componentInstance;
    testFixture.detectChanges();
  });


  it('should create an instance', () => {
    expect(directiveUnderTest).toBeTruthy();
  });
});
