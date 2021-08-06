import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LayoutComponent } from './start-project-from-scratch/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: "index",
    pathMatch:"full"
  },
  {
    path: 'index',
    component: IndexComponent,
    data: {
      title: 'index'
    }
  },
  {
    path: 'start-project-from-scratch',
    loadChildren: () => import('./start-project-from-scratch/start-project-from-scratch.module').then(m => m.StartProjectFromScratchModule),
    data: {
      title: 'Start Projects From Scratch'
    }
  },
  // {
  //   path: '',
  //   component: IndexComponent,
  //   data: {
  //     title: 'index'
  //   }
  // },
  // {
  //   path: '',
  //   component: IndexComponent,
  //   data: {
  //     title: 'index'
  //   }
  // },
  // {
  //   path: '**',
  //   redirectTo:"index",
  //   pathMatch:"full"
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
