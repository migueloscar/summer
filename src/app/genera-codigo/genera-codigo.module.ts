import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodigoDesdeModeloComponent } from './codigo-desde-modelo/codigo-desde-modelo.component';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GeneraCodigoRoutingModule } from './genera-codigo.routing.module';
import { MaterialModule } from './../material/material.module';

@NgModule({
  declarations: [
    CodigoDesdeModeloComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    GeneraCodigoRoutingModule,
    MaterialModule
  ]
})
export class GeneraCodigoModule { }
