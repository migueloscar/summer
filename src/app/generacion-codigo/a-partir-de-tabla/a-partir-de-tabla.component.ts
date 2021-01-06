import { Component, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';


@Component({
  selector: 'app-a-partir-de-tabla',
  templateUrl: './a-partir-de-tabla.component.html',
  styleUrls: ['./a-partir-de-tabla.component.scss']
})
export class APartirDeTablaComponent implements OnInit {

  listCampos : any[] = [];
  listCamposAuditoria : any[] = [
    {
      campo:"cusureg",
      codigotipo: 2,
      longitud : 4,
      descripcion : "USUARIO QUE REGISTRO"
    },
    {
      campo:"dfecreg",
      codigotipo: 5,
      longitud : 0,
      descripcion : "FECHA DE REGISTRO"
    },
    {
      campo:"cipregi",
      codigotipo: 3,
      longitud : 40,
      descripcion : "IP DE REGISTRO"
    },
    {
      campo:"cusumod",
      codigotipo: 2,
      longitud : 4,
      descripcion : "USUARIO MODIFICACION"
    },
    {
      campo:"dfecmod",
      codigotipo: 4,
      longitud : 0,
      descripcion : "FECHA DE MODIFICACION"
    },
    {
      campo:"cipmodi",
      codigotipo: 3,
      longitud : 40,
      descripcion : "IP DE MODIFICACION"
    },
    {
      campo:"lestado",
      codigotipo: 7,
      longitud : 0,
      descripcion : "ESTADO DEL REGISTRO"
    }
  ];

  listTiposCampos : any[]= [
    { 
      codigotipo: 1,
      tipo:"integer",
      tipoBD:"INTEGER",
      longitud : false
    },
    {
      codigotipo: 2,
      tipo:"character",
      tipoBD:"CHARACTER",
      longitud : true
    },
    {
      codigotipo: 3,
      tipo:"character varying",
      tipoBD:"CHARACTER VARYING",
      longitud : true
    },
    {
      codigotipo: 4,
      tipo:"date",
      tipoBD:"DATE",
      longitud : false
    },
    {
      codigotipo: 5,
      tipo:"date time",
      tipoBD:"TIMESTAMP WITHOUT TIME ZONE",
      longitud : false
    },
    {
      codigotipo: 6,
      tipo:"boolean",
      tipoBD:"BOOLEAN",
      longitud : false
    },
    {
      codigotipo: 7,
      tipo:"sereal",
      tipoBD:"SEREAL",
      longitud : false
    }
  ]

  tablaDatos : any = {
    nombre:"nombre",
    descripcion:"descripcion"
  };

  funcionesDatos : any = {
    funcionLista: { nombre:"FX_PER_LISMODULO",objetivo:"Lista los modulos"},
    funcionCrea:"FX_PER_INSMODULO",
    funcionActualiza:"FX_PER_ACTMODULO",
    funcionElimina:"FX_PER_DELMODULO"
  };

  desarrollador : any={
    nombre: "Miguel Aguirre Paucar",
    email:"maguirre@cajacentro.com.pe"
  }

  modulo : any={
    sistema : "Softia",
    modulo : "GESTION DE TALENTO HUMANO"
  }

  listaCamposTotales : any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.seleccionandoCampos();
    console.log("this.listaCamposTotales",this.listaCamposTotales);
  }
  
  agregarCampo(){
    console.log("agregar campo ejecutado");
    let nuevoCampo = {
      campo:"",
      codigotipo: 1,
      longitud : 0,
      tipoCampo : this.listTiposCampos.find(tipoCampo=>tipoCampo.codigotipo===1)
    };

    this.listCampos.push(nuevoCampo);
    
  }
  
  definirCamposTotales()
  {
    this.listaCamposTotales=[];
    this.listaCamposTotales.push(...this.listCampos); 
    this.listaCamposTotales.push(...this.listCamposAuditoria); 
  }

  seleccionandoCampos(){
    this.listCamposAuditoria.map(campo=>{
      campo["tipoCampo"] = this.listTiposCampos.find(tipoCampo=>tipoCampo.codigotipo===campo.codigotipo);
    })
  }

  generarCreacionTabla(){
    this.definirCamposTotales();

    let arrayTabla = [];
    
    //agregando elementos de la tabla
    arrayTabla.push(`-- Table: public.${this.tablaDatos.nombre};`);
    arrayTabla.push(`-- DROP TABLE public.${this.tablaDatos.nombre};`);
    arrayTabla.push(`CREATE TABLE ${this.tablaDatos.nombre}`);
    arrayTabla.push(`(`);

    //agregando campos
    this.listaCamposTotales.map((campo,indice)=>{
      let consCampo =`${campo.campo} \t ${campo.tipoCampo.tipoBD}`;
      consCampo += campo.tipoCampo.longitud ? `(${campo.longitud})` : '';
      consCampo += this.listaCamposTotales.length-1 !== indice ? "," : "" ;
      arrayTabla.push(consCampo);
    });

    //cerrando campos
    arrayTabla.push(`)`);
    arrayTabla.push(`WITH (`);
    arrayTabla.push(`  OIDS=FALSE`);
    arrayTabla.push(`);`);
    arrayTabla.push(`ALTER TABLE public.${this.tablaDatos.nombre}`);
    arrayTabla.push(`OWNER TO rgensoftia;`);
    arrayTabla.push(`GRANT ALL ON TABLE public.${this.tablaDatos.nombre} TO rgensoftia;`);
    arrayTabla.push(`GRANT SELECT, UPDATE, INSERT, DELETE ON TABLE public.${this.tablaDatos.nombre} TO cajacentro;`);
    arrayTabla.push(`COMMENT ON TABLE public.${this.tablaDatos.nombre} IS '${this.tablaDatos.descripcion}';`);
    
    //agregando campos
    this.listaCamposTotales.map((campo,indice)=>{
      let consCampo =`COMMENT ON COLUMN public.${this.tablaDatos.nombre} IS '${campo.descripcion}';`;
      arrayTabla.push(consCampo);
    });

    arrayTabla = arrayTabla.flatMap(elemento=>[elemento,"\n"])

    //generando el archivo
    let blob = new Blob(arrayTabla, { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'creacionTabla.sql');
  }

  generarFuncionesBD(){
    let fechaActual=new Date();

    this.definirCamposTotales();

    let arrayTabla = [];
    
    //titulo de funciones
    arrayTabla.push('-- ===================================================================');
    arrayTabla.push(`--  ${this.tablaDatos.nombre}`); 
    arrayTabla.push('-- ===================================================================');
    arrayTabla.push('');
    arrayTabla.push(`-- Function: public.${this.funcionesDatos.funcionLista.nombre}();`);
    arrayTabla.push('');
    arrayTabla.push(`-- DROP FUNCTION public.${this.funcionesDatos.funcionLista.nombre}();`);
    arrayTabla.push('');
    arrayTabla.push(`CREATE OR REPLACE FUNCTION public.${this.funcionesDatos.funcionLista.nombre}()`);
    
    //return table 
    let camposRetorna = []; 

    //agregando campos
    this.listCampos.map((campo,indice)=>{
      let consCampo =`${campo.campo} \t ${campo.tipoCampo.tipoBD}`;
      consCampo += campo.tipoCampo.longitud ? `(${campo.longitud})` : '';
      camposRetorna.push(consCampo);
    });

    arrayTabla.push(`\tRETURNS TABLE(${camposRetorna.join(', ')}) AS`);
    arrayTabla.push(`$BODY$`);
    arrayTabla.push(`DECLARE`);
    arrayTabla.push(`BEGIN`);
    arrayTabla.push(``);
    arrayTabla.push(`RETURN QUERY`);

    //return table 
    let camposLista = this.listCampos.map(campo => 'A.'+campo.campo); 

    arrayTabla.push(`SELECT ${camposLista.join(', ')}`);
    arrayTabla.push(`FROM ${this.tablaDatos.nombre} A`);
    arrayTabla.push(`WHERE A.lestado = TRUE;`);

    arrayTabla.push(`END;`);
    arrayTabla.push(`$BODY$`);
    arrayTabla.push(`  LANGUAGE plpgsql VOLATILE SECURITY DEFINER`);
    arrayTabla.push(`  COST 100`);
    arrayTabla.push(`  ROWS 1000;`);
    arrayTabla.push(`ALTER FUNCTION public.${this.funcionesDatos.funcionLista.nombre}()`);
    arrayTabla.push(`  OWNER TO rgensoftia;`);
    arrayTabla.push(`COMMENT ON FUNCTION public.${this.funcionesDatos.funcionLista.nombre}() IS '`);
    arrayTabla.push(`/***************************************************************************************************`);
    arrayTabla.push(`* COPYRIGHT © ${fechaActual.getFullYear()} CRAC CENTRO - All rights reserved.`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* OBJETIVO          : ${this.funcionesDatos.funcionLista.objetivo}`);
    arrayTabla.push(`* ESCRITO POR       : ${this.desarrollador.nombre}`);
    arrayTabla.push(`* EMAIL/MOVIL/PHONE : ${this.desarrollador.email}`);
    arrayTabla.push(`* FECHA CREACIÓN    : ${fechaActual.toISOString().substring(0,10)}`);
    arrayTabla.push(`* SISTEMA / MODULO  : ${this.modulo.sistema} / ${this.modulo.modulo}`);
    arrayTabla.push(`* MODIFICACIONES    :`);
    arrayTabla.push(`* Fecha  	Responsable  	Descripcion del cambio`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* SINTAXIS DE EJEMPLO:`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* SELECT * FROM .${this.funcionesDatos.funcionLista.nombre}()`);
    arrayTabla.push(`***************************************************************************************************/';`);
    arrayTabla.push(``);
    
    arrayTabla = arrayTabla.flatMap(elemento=>[elemento,"\n"])

    //generando el archivo
    let blob = new Blob(arrayTabla, { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'creacionFunciones.sql');
  }
}