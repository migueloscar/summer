import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodigoDesdeModeloComponent } from './codigo-desde-modelo.component';

describe('CodigoDesdeModeloComponent', () => {
  let component: CodigoDesdeModeloComponent;
  let fixture: ComponentFixture<CodigoDesdeModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodigoDesdeModeloComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodigoDesdeModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
