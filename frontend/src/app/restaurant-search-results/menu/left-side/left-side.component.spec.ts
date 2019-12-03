import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LeftSideComponent} from './menu.component';

describe('MenuComponent', () => {
  let component: LeftSideComponent;
  let fixture: ComponentFixture<LeftSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LeftSideComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
