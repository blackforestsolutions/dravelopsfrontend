import { ScrollTopDirective } from './scroll-top.directive';
import { ViewportScroller, ɵNullViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import spyOn = jest.spyOn;

@Component({
  template: '<button dravelopsfrontendScrollTop [hiddenOnStartPage]="true">Test Button</button>'
})
class TestHostComponent {
}

describe('ScrollTopDirective', () => {

  const viewportScroller: ViewportScroller = new ɵNullViewportScroller();

  const directiveUnderTest: ScrollTopDirective = new ScrollTopDirective(viewportScroller);

  describe('without host', () => {
    it('should create an instance', () => {
      expect(directiveUnderTest).toBeTruthy();
    });

    it('should not display host when pageYOffset is zero and hiddenOnStartPage is true', () => {
      directiveUnderTest.hiddenOnStartPage = true;

      directiveUnderTest.ngOnInit();

      expect(directiveUnderTest.display).toBe('none');
    });

    it('should display host when pageYOffset is zero and hiddenOnStartPage is false', () => {
      directiveUnderTest.hiddenOnStartPage = false;

      directiveUnderTest.ngOnInit();

      expect(directiveUnderTest.display).toBe('unset');
    });

    it('should display host when pageYOffset is greater than zero and hiddenOnStartPage is true', () => {
      directiveUnderTest.hiddenOnStartPage = true;
      window = Object.assign(window, { pageYOffset: 1 });

      directiveUnderTest.ngOnInit();

      expect(directiveUnderTest.display).toBe('unset');
    });

    it('should display host when pageYOffset is greater than zero and hiddenOnStartPage is false', () => {
      directiveUnderTest.hiddenOnStartPage = false;
      window = Object.assign(window, { pageYOffset: 1 });

      directiveUnderTest.ngOnInit();

      expect(directiveUnderTest.display).toBe('unset');
    });

    it('should set "display" when "onWindowScroll" is called, pageYOffset is zero and hiddenOnStartPage is false', () => {
      directiveUnderTest.hiddenOnStartPage = false;

      directiveUnderTest.onWindowScroll();

      expect(directiveUnderTest.display).toBe('unset');
    });
  });

  describe('with host', () => {
    let testHostComponent: TestHostComponent;
    let testHostFixture: ComponentFixture<TestHostComponent>;
    let viewportScrollerMock: ViewportScroller;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [
          ScrollTopDirective,
          TestHostComponent
        ]
      });

      testHostFixture = TestBed.createComponent(TestHostComponent);
      testHostComponent = testHostFixture.componentInstance;
      viewportScrollerMock = TestBed.inject(ViewportScroller);
    });

    it('should be called "scrollToPosition" with right params when "scrollToTop" is clicked', () => {
      const viewPortScrollerSpy = spyOn(viewportScrollerMock, 'scrollToPosition');
      const testButton = testHostFixture.nativeElement.querySelector('button');
      window.scrollTo = jest.fn();

      testButton.click();

      expect(viewPortScrollerSpy).toHaveBeenCalledTimes(1);
      expect(viewPortScrollerSpy).toHaveBeenCalledWith([0, 0]);
    });
  });
});
