import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getValueFromLocalStorage(key:string){
    return localStorage.getItem(key);
  }

  setValueToLocalStorage(key:string, value:any){
    localStorage.setItem(key, value);
  }

  initProjectInLocalStorage(projectDetails:any, developer:any, tables:any){
    this.setValueToLocalStorage("projectDetails",projectDetails);
    this.setValueToLocalStorage("developer",developer);
    this.setValueToLocalStorage("tables",tables);
  }
}
