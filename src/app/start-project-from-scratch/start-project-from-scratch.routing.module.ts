import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { StartingProjectComponent } from './starting-project/starting-project.component';
import { WorkingInProjectComponent } from './working-in-project/working-in-project.component';
const routes: Routes = [
  {
    path : '',
    component: LayoutComponent,
    data: {
      title: 'Código desde modelo'
    },
    children:[
      {
        path: '',
        redirectTo: 'starting-project'
      },
      {
        path: 'starting-project',
        component: StartingProjectComponent,
        data: {
          title: 'Código desde modelo'
        },
      },
      {
        path: 'working-in-project',
        component: WorkingInProjectComponent,
        data: {
          title: 'Código desde modelo'
        },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartProjectFromScratchRoutingModule { }
