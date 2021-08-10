import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projectInfo : any = {
    name:"Justificaciones"
  }

  developer : any = {
    name:"Miguel Aguirre",
    username:"maguirre",
    email:"maguirre@cajacentro.com.pe"
  }

  tables: any[] = [
    {
      name:"s01mmodulo",
      tableDescription:"Tabla maestra de módulos",
      dataFields:[
        {
          name:"cnommod",
          type: 2,
          length : 4,
          description : "Nombre del modulo."
        }
      ],
      auditFields:[
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

      ],
      functions:[
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
    }
  ]

  constructor(private storageService:StorageService) { }
  
  initProject(projectInfo:any, developer:any, tables:any){
    this.storageService.initProjectInLocalStorage(projectInfo,developer,tables);
  }
}
