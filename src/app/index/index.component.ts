import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
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

  showFiller = false;
}
