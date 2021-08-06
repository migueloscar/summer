import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestoringProjectComponent } from './restoring-project.component';

describe('RestoringProjectComponent', () => {
  let component: RestoringProjectComponent;
  let fixture: ComponentFixture<RestoringProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestoringProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestoringProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
