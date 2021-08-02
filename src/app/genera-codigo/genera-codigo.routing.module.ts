import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodigoDesdeModeloComponent } from './codigo-desde-modelo/codigo-desde-modelo.component';


const routes: Routes = [
  {
    path : '',
    redirectTo:'codigo-desde-modelo',
    pathMatch: 'full'
  },
  {
    path: 'codigo-desde-modelo',
    component: CodigoDesdeModeloComponent,
    data: {
      title: 'codigo desde modelo'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneraCodigoRoutingModule { }
