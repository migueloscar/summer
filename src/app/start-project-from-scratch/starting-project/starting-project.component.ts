import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-starting-project',
  templateUrl: './starting-project.component.html',
  styleUrls: ['./starting-project.component.scss']
})
export class StartingProjectComponent implements OnInit {
  proyecto : any = {};
  desarrollador : any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
