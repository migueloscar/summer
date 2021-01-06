import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { APartirDeTablaComponent } from './a-partir-de-tabla/a-partir-de-tabla.component';

const routes: Routes = [
  {
    path: 'a-partir-de-tabla',
    component: APartirDeTablaComponent,
    data: {
      title: 'A partir de tabla'
    }
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneracionCodigoRoutingModule {}
