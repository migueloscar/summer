import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './layout/layout.component';
import { StartingProjectComponent } from './starting-project/starting-project.component';
import { WorkingInProjectComponent } from './working-in-project/working-in-project.component';
import { StartProjectFromScratchRoutingModule } from './start-project-from-scratch.routing.module';

@NgModule({
  declarations: [
    WorkingInProjectComponent,
    LayoutComponent,
    StartingProjectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    StartProjectFromScratchRoutingModule,
    MaterialModule
  ]
})
export class StartProjectFromScratchModule { }
