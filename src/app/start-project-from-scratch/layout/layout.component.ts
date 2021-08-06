import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }
  menu:any[]=[];

  ngOnInit(): void {
    this.menu = [
      {
        parent : true,
        description:"Generación de Código",
        ruta:""
      },
      {
        parent : false,
        description:"Desde Tabla",
        ruta:"generacion-codigo/codigo-desde-modelo"
      },
      {
        parent : false,
        description:"Recuperar Json",
        ruta:"generacion-codigo/codigo-desde-json"
      }
    ]
  }
  
}
