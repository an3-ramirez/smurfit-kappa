import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFigureComponent } from './form-figure.component';

describe('FormFigureComponent', () => {
  let component: FormFigureComponent;
  let fixture: ComponentFixture<FormFigureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFigureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFigureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
