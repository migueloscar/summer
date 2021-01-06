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
    arrayTabla.push(`*`);
    arrayTabla.push(`* OBJETIVO          : ${this.funcionesDatos.funcionLista.objetivo}`);
    arrayTabla.push(`COMMENT ON FUNCTION public.${this.funcionesDatos.funcionLista}() IS '`);
      
-- Function: public.FX_PER_LISMODULO();

-- DROP FUNCTION public.FX_PER_LISMODULO();

CREATE OR REPLACE FUNCTION public.FX_PER_LISMODULO()
	RETURNS TABLE(ncodmod integer, cnommod CHARACTER VARYING(100)) AS
$BODY$
DECLARE
BEGIN

	RETURN QUERY
	SELECT 	A.ncodmod	,	A.cnommod	
	FROM R01MMODULO A
  WHERE A.lestado = TRUE;

END;
$BODY$
  LANGUAGE plpgsql VOLATILE SECURITY DEFINER
  COST 100
  ROWS 1000;
ALTER FUNCTION public.FX_PER_LISMODULO()
  OWNER TO rgensoftia;
COMMENT ON FUNCTION public.FX_PER_LISMODULO() IS '
/***************************************************************************************************
* COPYRIGHT © 2019 CRAC CENTRO - All rights reserved.
* 
* OBJETIVO          : lista los modulos
* ESCRITO POR       : MIGUEL OSCAR AGUIRRE PAUCAR
* EMAIL/MOVIL/PHONE : maguirre@cajacentro.com.pe
* FECHA CREACIÓN    : 2020-01-05
* SISTEMA / MODULO  : SOFTIA / CREDITOS
* MODIFICACIONES    :
* Fecha  	Responsable  	Descripcion del cambio
* 
* SINTAXIS DE EJEMPLO:
* 
* SELECT * FROM FX_PER_LISMODULO()
***************************************************************************************************/';



    //agregando elementos de la tabla
    arrayTabla.push(`-- Table: public.${this.tablaDatos.nombre};`);
    arrayTabla.push(`-- DROP TABLE public.${this.tablaDatos.nombre};`);
    arrayTabla.push(`CREATE TABLE ${this.tablaDatos.nombre}`);
    arrayTabla.push(`(`);

    //agregando campos
    this.listaCamposTotales.map((campo,indice)=>{
      console.log("indices diferentes ",this.listaCamposTotales.length,indice);
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
    FileSaver.saveAs(blob, 'creacionFunciones.sql');
  }

  //generando funciones de base de datos
-- =======================================================================================================
-- MODULOS
-- =======================================================================================================

-- Function: public.FX_PER_LISMODULO();

-- DROP FUNCTION public.FX_PER_LISMODULO();

CREATE OR REPLACE FUNCTION public.FX_PER_LISMODULO()
	RETURNS TABLE(ncodmod integer, cnommod CHARACTER VARYING(100)) AS
$BODY$
DECLARE
BEGIN

	RETURN QUERY
	SELECT 	A.ncodmod	,	A.cnommod	
	FROM R01MMODULO A
  WHERE A.lestado = TRUE;

END;
$BODY$
  LANGUAGE plpgsql VOLATILE SECURITY DEFINER
  COST 100
  ROWS 1000;
ALTER FUNCTION public.FX_PER_LISMODULO()
  OWNER TO rgensoftia;
COMMENT ON FUNCTION public.FX_PER_LISMODULO() IS '
/***************************************************************************************************
* COPYRIGHT © 2019 CRAC CENTRO - All rights reserved.
* 
* OBJETIVO          : lista los modulos
* ESCRITO POR       : MIGUEL OSCAR AGUIRRE PAUCAR
* EMAIL/MOVIL/PHONE : maguirre@cajacentro.com.pe
* FECHA CREACIÓN    : 2020-01-05
* SISTEMA / MODULO  : SOFTIA / CREDITOS
* MODIFICACIONES    :
* Fecha  	Responsable  	Descripcion del cambio
* 
* SINTAXIS DE EJEMPLO:
* 
* SELECT * FROM FX_PER_LISMODULO()
***************************************************************************************************/';


-- Function: public.FX_PER_INSMODULO(IN CHARACTER VARYING(100),IN CHARACTER(4),IN CHARACTER VARYING(40));

-- DROP FUNCTION public.FX_PER_INSMODULO(IN CHARACTER VARYING(100),IN CHARACTER(4),IN CHARACTER VARYING(40));

CREATE OR REPLACE FUNCTION public.FX_PER_INSMODULO(IN CHARACTER VARYING(100),IN CHARACTER(4),IN CHARACTER VARYING(40))
	RETURNS TABLE(ncodmod INTEGER) AS
$BODY$
DECLARE
	P_CNOMMOD      ALIAS FOR $1;
	P_CUSUREG      ALIAS FOR $2;
  P_CIPREGI      ALIAS FOR $3;
BEGIN
	
	RETURN QUERY
	INSERT INTO R01MMODULO
	(
		cnommod ,
		--datos auditoria
	  cusureg 	,  dfecreg 	,
	  cipregi 	,  lestado 	
	)
	VALUES
	(
		P_CNOMMOD	,
		P_CUSUREG	,	NOW()		,
		P_CIPREGI	,	true
	)
	RETURNING R01MMODULO.ncodmod;

END;
$BODY$
  LANGUAGE plpgsql VOLATILE SECURITY DEFINER
  COST 100
  ROWS 1000;
ALTER FUNCTION public.FX_PER_INSMODULO(IN CHARACTER VARYING(100),IN CHARACTER(4),IN CHARACTER VARYING(40))
  OWNER TO rgensoftia;
COMMENT ON FUNCTION public.FX_PER_INSMODULO(IN CHARACTER VARYING(100),IN CHARACTER(4),IN CHARACTER VARYING(40)) IS '
/***************************************************************************************************
* COPYRIGHT © 2019 CRAC CENTRO - All rights reserved.
* 
* OBJETIVO          : lista los modulos
* ESCRITO POR       : MIGUEL OSCAR AGUIRRE PAUCAR
* EMAIL/MOVIL/PHONE : maguirre@cajacentro.com.pe
* FECHA CREACIÓN    : 2020-01-05
* SISTEMA / MODULO  : SOFTIA / CREDITOS
* MODIFICACIONES    :
* Fecha  	Responsable  	Descripcion del cambio
* 
* SINTAXIS DE EJEMPLO:
* 
* SELECT * FROM FX_PER_INSMODULO(IN CHARACTER VARYING(100),IN CHARACTER(4),IN CHARACTER VARYING(40))
***************************************************************************************************/';

-- Function: public.FX_PER_ACTMODULO(IN INTEGER,IN CHARACTER VARYING(100),IN CHARACTER(4),IN CHARACTER VARYING(40));

-- DROP FUNCTION public.FX_PER_ACTMODULO(IN INTEGER,IN CHARACTER VARYING(100),IN CHARACTER(4),IN CHARACTER VARYING(40));

CREATE OR REPLACE FUNCTION public.FX_PER_ACTMODULO(IN INTEGER,IN CHARACTER VARYING(100),IN CHARACTER(4),IN CHARACTER VARYING(40))
	RETURNS TABLE(ncodmod INTEGER) AS
$BODY$
DECLARE
	P_NCODMOD      ALIAS FOR $1;
	P_CNOMMOD      ALIAS FOR $2;
	P_CUSUMOD      ALIAS FOR $3;
  P_CIPMODI      ALIAS FOR $4;
BEGIN
	
	RETURN QUERY
	UPDATE R01MMODULO
	SET
		cnommod = P_CNOMMOD,
		--datos auditoria
	  cusumod = P_CUSUMOD,
		dfecmod =	NOW(),
	  cipmodi =	P_CIPMODI,  
		lestado =	true
	WHERE R01MMODULO.ncodmod = P_NCODMOD
	RETURNING R01MMODULO.ncodmod;

END;
$BODY$
  LANGUAGE plpgsql VOLATILE SECURITY DEFINER
  COST 100
  ROWS 1000;
ALTER FUNCTION public.FX_PER_ACTMODULO(IN INTEGER,IN CHARACTER VARYING(100),IN CHARACTER(4),IN CHARACTER VARYING(40))
  OWNER TO rgensoftia;
COMMENT ON FUNCTION public.FX_PER_ACTMODULO(IN INTEGER,IN CHARACTER VARYING(100),IN CHARACTER(4),IN CHARACTER VARYING(40)) IS '
/***************************************************************************************************
* COPYRIGHT © 2019 CRAC CENTRO - All rights reserved.
* 
* OBJETIVO          : lista los modulos
* ESCRITO POR       : MIGUEL OSCAR AGUIRRE PAUCAR
* EMAIL/MOVIL/PHONE : maguirre@cajacentro.com.pe
* FECHA CREACIÓN    : 2020-01-05
* SISTEMA / MODULO  : SOFTIA / CREDITOS
* MODIFICACIONES    :
* Fecha  	Responsable  	Descripcion del cambio
* 
* SINTAXIS DE EJEMPLO:
* 
* SELECT * FROM FX_PER_ACTMODULO(IN INTEGER,IN CHARACTER VARYING(100),IN CHARACTER(4),IN CHARACTER VARYING(40))
***************************************************************************************************/';

-- Function: public.FX_PER_DELMODULO(IN INTEGER,IN CHARACTER(4),IN CHARACTER VARYING(40));

-- DROP FUNCTION public.FX_PER_DELMODULO(IN INTEGER,IN CHARACTER(4),IN CHARACTER VARYING(40));

CREATE OR REPLACE FUNCTION public.FX_PER_DELMODULO(IN INTEGER,IN CHARACTER(4),IN CHARACTER VARYING(40))
	RETURNS TABLE(ncodmod INTEGER) AS
$BODY$
DECLARE
	P_NCODMOD      ALIAS FOR $1;
	P_CUSUMOD      ALIAS FOR $2;
  P_CIPMODI      ALIAS FOR $3;
BEGIN
	
	RETURN QUERY
	UPDATE R01MMODULO
	SET
		--datos auditoria
	  cusumod = P_CUSUMOD,
		dfecmod =	NOW(),
	  cipmodi =	P_CIPMODI,  
		lestado =	false
	WHERE R01MMODULO.ncodmod = P_NCODMOD
	RETURNING R01MMODULO.ncodmod;

END;
$BODY$
  LANGUAGE plpgsql VOLATILE SECURITY DEFINER
  COST 100
  ROWS 1000;
ALTER FUNCTION public.FX_PER_DELMODULO(IN INTEGER,IN CHARACTER(4),IN CHARACTER VARYING(40))
  OWNER TO rgensoftia;
COMMENT ON FUNCTION public.FX_PER_DELMODULO(IN INTEGER,IN CHARACTER(4),IN CHARACTER VARYING(40)) IS '
/***************************************************************************************************
* COPYRIGHT © 2019 CRAC CENTRO - All rights reserved.
* 
* OBJETIVO          : elimina un modulo
* ESCRITO POR       : MIGUEL OSCAR AGUIRRE PAUCAR
* EMAIL/MOVIL/PHONE : maguirre@cajacentro.com.pe
* FECHA CREACIÓN    : 2020-01-05
* SISTEMA / MODULO  : SOFTIA / CREDITOS
* MODIFICACIONES    :
* Fecha  	Responsable  	Descripcion del cambio
* 
* SINTAXIS DE EJEMPLO:
* 
* SELECT * FROM FX_PER_DELMODULO(IN INTEGER,IN CHARACTER(4),IN CHARACTER VARYING(40))
***************************************************************************************************/';



}
