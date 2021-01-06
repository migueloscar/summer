import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { APartirDeTablaComponent } from './a-partir-de-tabla.component';

describe('APartirDeTablaComponent', () => {
  let component: APartirDeTablaComponent;
  let fixture: ComponentFixture<APartirDeTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ APartirDeTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(APartirDeTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
