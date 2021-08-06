import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartingProjectComponent } from './starting-project.component';

describe('StartingProjectComponent', () => {
  let component: StartingProjectComponent;
  let fixture: ComponentFixture<StartingProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartingProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartingProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
