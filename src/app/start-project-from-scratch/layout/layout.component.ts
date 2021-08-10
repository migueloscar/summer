import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  options: FormGroup;
  allTables: any[] = [];
  menu:any[]=[];

  constructor(fb: FormBuilder,private tableService:TableService) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }
  

  ngOnInit(): void {
    //this.allTables = this.tableService.getTables();
    let texto = this.tableService.getTables();
    console.log("texto",texto);
    let listMenus = this.allTables.map((table:any) => 
    {
      return {
        parent : false,
        description : table.name,
        path : table.name
      };
    });

    this.menu = [
      {
        parent : true,
        description : "Generación de Código",
        path : ""
      }
    ]
    this.menu.push(...listMenus);
  }

  addTable(){
    
  }
}