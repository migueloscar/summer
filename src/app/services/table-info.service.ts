import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root'
})
export class TableInfoService {

  constructor(private storageService:StorageService, 
              private tableService:TableService) { }

  getTableInfo(table:any){
    return table.
  }
  
  setTableInfo(table,tableInfo:any){
    table.tableInfo = tableInfo;
    
    this.tableService.setTables()
  }
}
