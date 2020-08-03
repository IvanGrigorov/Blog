import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PnavigationComponent } from './pnavigation.component';

describe('PnavigationComponent', () => {
  let component: PnavigationComponent;
  let fixture: ComponentFixture<PnavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PnavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PnavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
