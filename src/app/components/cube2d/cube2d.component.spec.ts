import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cube2dComponent } from './cube2d.component';

describe('Cube2dComponent', () => {
  let component: Cube2dComponent;
  let fixture: ComponentFixture<Cube2dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Cube2dComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Cube2dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
