import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';

import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-starting-project',
  templateUrl: './starting-project.component.html',
  styleUrls: ['./starting-project.component.scss']
})
export class StartingProjectComponent implements OnInit {
  project : any = {};
  developer : any = {};
  constructor(private projectService :ProjectService,
    private tableService:TableService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit(): void {
  }

  passToWorking(){
    this.router.navigate(['./../working-in-project'], { relativeTo: this.route });
  }

  startingProject(){
    let projectInfo = this.project;
    let developer = this.developer;
    let tables = [this.tableService.getDefaultTableLayout()];
    this.projectService.initProject(projectInfo,developer,tables);
  }

}
