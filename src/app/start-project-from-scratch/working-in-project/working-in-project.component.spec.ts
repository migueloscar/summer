import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingInProjectComponent } from './working-in-project.component';

describe('WorkingInProjectComponent', () => {
  let component: WorkingInProjectComponent;
  let fixture: ComponentFixture<WorkingInProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingInProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkingInProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
