import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getValueFromLocalStorage(key:string){
    return JSON.parse(localStorage.getItem(key) || 'null');
  }

  setValueToLocalStorage(key:string, value:any){
    let valueString = JSON.stringify(value);
    localStorage.setItem(key, valueString);
  }

  initProjectInLocalStorage(projectDetails:any, developer:any, tables:any){
    this.setValueToLocalStorage("projectDetails",projectDetails);
    this.setValueToLocalStorage("developer",developer);
    this.setValueToLocalStorage("tables",tables);
  }
}
