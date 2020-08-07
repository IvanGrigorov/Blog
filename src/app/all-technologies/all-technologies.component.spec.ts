import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTechnologiesComponent } from './all-technologies.component';

describe('AllTechnologiesComponent', () => {
  let component: AllTechnologiesComponent;
  let fixture: ComponentFixture<AllTechnologiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllTechnologiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTechnologiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
