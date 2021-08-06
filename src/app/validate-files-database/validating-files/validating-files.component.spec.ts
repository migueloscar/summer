import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidatingFilesComponent } from './validating-files.component';

describe('ValidatingFilesComponent', () => {
  let component: ValidatingFilesComponent;
  let fixture: ComponentFixture<ValidatingFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ValidatingFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidatingFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
