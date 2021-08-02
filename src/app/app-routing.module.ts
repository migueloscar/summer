import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    data: {
      title: 'index'
    },
    children: [
      {
        path: 'generacion-codigo',
        loadChildren: () => import('./genera-codigo/genera-codigo.module').then(m => m.GeneraCodigoModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
