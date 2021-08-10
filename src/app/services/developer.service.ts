import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor() { }

  getDeveloper(){
    return this.project.developer;
  }

  setDeveloper(developerObject:any){
    this.project.developer = developerObject;
  }
  
}
