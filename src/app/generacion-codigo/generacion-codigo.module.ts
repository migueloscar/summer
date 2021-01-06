import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { APartirDeTablaComponent } from './a-partir-de-tabla/a-partir-de-tabla.component';
import { GeneracionCodigoRoutingModule } from './generacion-codigo-routing.module';

@NgModule({
  declarations: [APartirDeTablaComponent],
  imports: [    
    FormsModule,
    CommonModule,
    GeneracionCodigoRoutingModule
  ]
})
export class GeneracionCodigoModule { }
