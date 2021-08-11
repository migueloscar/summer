import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class TableService {
  defaultTableInfo : any = {
    name:"s01mmodulo",
    description:"Tabla maestra de módulos",
    module:{
      name:"Personal",
      abbreviation: "PER",
      initial:"r"
    }
  }
  defaultDataFields : any[] = [
    {
      name:"cnommod",
      type: 2,
      length : 4,
      description : "Nombre del modulo."
    }
  ];
  defaultAuditFields : any[] = [
    {
      name:"cusureg",
      type: 2,
      length : 4,
      description : "Usuario que realizó la creación de este registro."
    },
    {
      name:"dfecreg",
      type: 5,
      length : 0,
      description : "Fecha cuando se realizó la creación de este registro."
    },
    {
      name:"cipregi",
      type: 3,
      length : 40,
      description : "IP desde donde se realizó la creación de este registro."
    },
    {
      name:"cusumod",
      type: 2,
      length : 4,
      description : "Usuario que realizó la última modificación."
    },
    {
      name:"dfecmod",
      type: 5,
      length : 0,
      description : "Fecha que se realizó la última modificación."
    },
    {
      name:"cipmodi",
      type: 3,
      length : 40,
      description : "IP desde donde se realizó la última modificación."
    },
    {
      name:"lestado",
      type: 6,
      length : 0,
      description : "Estado lógico del registro."
    }
  ]
  
  defaultFunctions : any[] = [ 
    {
      name:"FX_PER_SELMODULO",
      description:"Lista los módulos",
    },
    {
      name:"FX_PER_INSMODULO",
      description:"Inserta los módulos",
    },
    {
      name:"FX_PER_UPDMODULO",
      description:"Actualiza los módulos",
    },
    {
      name:"FX_PER_ELIMODULO",
      description:"Elimina los módulos",
    }
  ]

  constructor(private storageService:StorageService) { }

  getDefaultTableLayout(){
    let tables = this.getTables();
    let maxId = Math.max(...tables.map((table:any) => table.id));
    let tableLayout = {
      id : maxId+1,
      tableInfo: this.defaultTableInfo,
      dataFields : this.defaultDataFields,
      auditFields : this.defaultAuditFields,
      functions : this.defaultFunctions
    };
    return tableLayout;
  }

  getTables(){
    return this.storageService.getValueFromLocalStorage("tables");
  }

  setTables(tablesObject:any){
    return this.storageService.setValueToLocalStorage("tables",tablesObject);
  }

  addTable(){
    let tables = this.getTables();
    tables.push(this.getDefaultTableLayout());
    this.setTables(tables);
  }
}
