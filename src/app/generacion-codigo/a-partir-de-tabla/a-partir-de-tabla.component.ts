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
      codigotipo: 6,
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
    funcionLista: { 
      nombre:"FX_PER_LISMODULO",
      objetivo:"Lista los modulos"
    },
    funcionCrea: { 
      nombre:"FX_PER_INSMODULO",
      objetivo:"inserta los modulos"
    },
    funcionActualiza: { 
      nombre:"FX_PER_ACTMODULO",
      objetivo:"actualiza los modulos"
    } ,
    funcionElimina: { 
      nombre:"FX_PER_DELMODULO",
      objetivo:"elimina los modulos"
    } 
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

  funcionListarBD(){
    let fechaActual=new Date();

    this.definirCamposTotales();

    let arrayTabla = [];
    
    //titulo de funciones
    arrayTabla.push('-- ===================================================================');
    arrayTabla.push(`--  ${this.tablaDatos.nombre}`); 
    arrayTabla.push('-- ===================================================================');
    arrayTabla.push('');

    //====================================================================================================
    // FUNCION LISTAR
    //====================================================================================================


    arrayTabla.push(`-- Function: public.${this.funcionesDatos.funcionLista.nombre}();`);
    arrayTabla.push('');
    arrayTabla.push(`-- DROP FUNCTION public.${this.funcionesDatos.funcionLista.nombre}();`);
    arrayTabla.push('');
    arrayTabla.push(`CREATE OR REPLACE FUNCTION public.${this.funcionesDatos.funcionLista.nombre}()`);
    
    //return table 
    let camposRetorna = []; 

    this.listCampos.map((campo,indice)=>{
      let tipoCampo = campo.tipoCampo.tipoBD === 'SEREAL' ? 'INTEGER':campo.tipoCampo.tipoBD;
      let consCampo =`${campo.campo} \t ${tipoCampo}`;
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
    arrayTabla.push(`* COPYRIGHT ?? ${fechaActual.getFullYear()} CRAC CENTRO - All rights reserved.`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* OBJETIVO          : ${this.funcionesDatos.funcionLista.objetivo}`);
    arrayTabla.push(`* ESCRITO POR       : ${this.desarrollador.nombre}`);
    arrayTabla.push(`* EMAIL/MOVIL/PHONE : ${this.desarrollador.email}`);
    arrayTabla.push(`* FECHA CREACI??N    : ${fechaActual.toISOString().substring(0,10)}`);
    arrayTabla.push(`* SISTEMA / MODULO  : ${this.modulo.sistema} / ${this.modulo.modulo}`);
    arrayTabla.push(`* MODIFICACIONES    :`);
    arrayTabla.push(`* Fecha  	Responsable  	Descripcion del cambio`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* SINTAXIS DE EJEMPLO:`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* SELECT * FROM .${this.funcionesDatos.funcionLista.nombre}()`);
    arrayTabla.push(`***************************************************************************************************/';`);
    arrayTabla.push(``);

    return arrayTabla;

  }

  funcionInsertarBD(){
    let fechaActual=new Date();

    this.definirCamposTotales();

    let camposAuditoriaFuncionParametros = ["cusureg","cipregi"];
    let camposAuditoriaInsercionRegistrar = ["cusureg","cipregi","dfecreg","lestado"];

    let arrayTabla = [];
    
    //====================================================================================================
    // FUNCION INSERTAR
    //====================================================================================================

    let camposFuncionParametros = [];
    let camposFuncionParametrosLocales = []; 

    let camposInsercion = [];

    this.listCampos.map((campo,indice)=>{
      if(campo.tipoCampo.tipoBD !== 'SEREAL')
      {
        let consCampo = `IN ${campo.tipoCampo.tipoBD}`;
        consCampo += campo.tipoCampo.longitud ? `(${campo.longitud})` : '';
        
        //parametros que recibe la funcion
        camposFuncionParametros.push(consCampo);

        //para las variables locales
        camposFuncionParametrosLocales.push(`${campo.campo}`);
      }
    });

    camposAuditoriaFuncionParametros.map((campo,indice)=>{
      let campoAuditoria = this.listCamposAuditoria.find(campoAuditoria => campoAuditoria.campo === campo);
      campoAuditoria["tipoCampo"] = this.listTiposCampos.find(tipoCampo => campoAuditoria.codigotipo === tipoCampo.codigotipo);
  
      let consCampo = `IN ${campoAuditoria["tipoCampo"].tipoBD}`;
      consCampo += campoAuditoria["tipoCampo"].longitud ? `(${campoAuditoria.longitud})` : '';
      
      //parametros que recibe la funcion
      camposFuncionParametros.push(consCampo);

      //para las variables locales
      camposFuncionParametrosLocales.push(`${campoAuditoria.campo}`);
    });


    arrayTabla.push(`-- Function: public.${this.funcionesDatos.funcionCrea.nombre}(${camposFuncionParametros.join(', ')});`);
    arrayTabla.push('');
    arrayTabla.push(`-- DROP FUNCTION public.${this.funcionesDatos.funcionCrea.nombre}(${camposFuncionParametros.join(', ')});`);
    arrayTabla.push('');
    arrayTabla.push(`CREATE OR REPLACE FUNCTION public.${this.funcionesDatos.funcionCrea.nombre}(${camposFuncionParametros.join(', ')})`);
    
    
    //return table 
    let camposRetorna = [];
    let camposRetornaInsercion = [];

    this.listCampos.map((campo,indice)=>{
      if(campo.tipoCampo.tipoBD === 'SEREAL')
      {
        let tipoCampo = campo.tipoCampo.tipoBD === 'SEREAL' ? 'INTEGER':'';
        let consCampo = `${campo.campo} ${tipoCampo}`;
        consCampo += campo.tipoCampo.longitud ? `(${campo.longitud})` : '';
        camposRetorna.push(consCampo);
        camposRetornaInsercion.push(`${campo.campo}`);
      }
    });

    arrayTabla.push(`\tRETURNS TABLE(${camposRetorna.join(', ')}) AS`);
    arrayTabla.push(`$BODY$`);
    arrayTabla.push(`DECLARE`);

    camposFuncionParametrosLocales.map((parametroLocal, index)=>{
      arrayTabla.push(`P_${parametroLocal} \t ALIAS FOR $${index+1};`);
    });

    arrayTabla.push(`BEGIN`);
    arrayTabla.push(``);
    arrayTabla.push(`RETURN QUERY`);
    arrayTabla.push(`INSERT INTO ${this.tablaDatos.nombre}`);
    arrayTabla.push(`(`);

    let camposAInsercion = [];
    this.listCampos.map((campo,indice)=>{
      if(campo.tipoCampo.tipoBD !== 'SEREAL')
      {
        camposAInsercion.push(campo.campo)
      }
    });

    camposAuditoriaInsercionRegistrar.map((campo,indice)=>{
      camposAInsercion.push(campo);
    });
    
    arrayTabla.push(`${camposAInsercion.join(', ')}`);

    arrayTabla.push(`)`);
    arrayTabla.push(`VALUES`);
    arrayTabla.push(`(`);

    let valorAInsertar = camposAInsercion.map(campo=>{
      switch(campo)
      {
        case "dfecreg" :{
          return 'now()'
        }
        break;
        case "lestado" :{
          return 'true'
        }
        break;
        default:{
          return `P_${campo}`
        }
        break;
      }
    });
    arrayTabla.push(`${valorAInsertar.join(', ')}`);
    arrayTabla.push(`)`);
    arrayTabla.push(`RETURNING `);
    arrayTabla.push(`${camposRetornaInsercion.map(campo=>`${this.tablaDatos.nombre}.${campo}`).join(', ')};`);
    arrayTabla.push(``);
    arrayTabla.push(`END;`);
    arrayTabla.push(`$BODY$`);
    arrayTabla.push(`  LANGUAGE plpgsql VOLATILE SECURITY DEFINER`);
    arrayTabla.push(`  COST 100`);
    arrayTabla.push(`  ROWS 1000;`);
    arrayTabla.push(`ALTER FUNCTION public.${this.funcionesDatos.funcionCrea.nombre}(${camposFuncionParametros.join(', ')})`);
    arrayTabla.push(`  OWNER TO rgensoftia;`);
    arrayTabla.push(`COMMENT ON FUNCTION public.${this.funcionesDatos.funcionCrea.nombre}(${camposFuncionParametros.join(', ')}) IS '`);
    arrayTabla.push(`/***************************************************************************************************`);
    arrayTabla.push(`* COPYRIGHT ?? ${fechaActual.getFullYear()} CRAC CENTRO - All rights reserved.`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* OBJETIVO          : ${this.funcionesDatos.funcionCrea.objetivo}`);
    arrayTabla.push(`* ESCRITO POR       : ${this.desarrollador.nombre}`);
    arrayTabla.push(`* EMAIL/MOVIL/PHONE : ${this.desarrollador.email}`);
    arrayTabla.push(`* FECHA CREACI??N    : ${fechaActual.toISOString().substring(0,10)}`);
    arrayTabla.push(`* SISTEMA / MODULO  : ${this.modulo.sistema} / ${this.modulo.modulo}`);
    arrayTabla.push(`* MODIFICACIONES    :`);
    arrayTabla.push(`* Fecha  	Responsable  	Descripcion del cambio`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* SINTAXIS DE EJEMPLO:`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* SELECT * FROM .${this.funcionesDatos.funcionCrea.nombre}(${camposFuncionParametros.join(', ')})`);
    arrayTabla.push(`***************************************************************************************************/';`);
    arrayTabla.push(``);

    return arrayTabla;

  }

  funcionActualizarBD(){
    let fechaActual=new Date();

    this.definirCamposTotales();

    let camposAuditoriaFuncionParametros = ["cusumod","cipmodi"];
    let camposAuditoriaActualizarRegistrar = ["cusumod","cipmodi","dfecmod"];

    let arrayTabla = [];
    
    //====================================================================================================
    // FUNCION INSERTAR
    //====================================================================================================

    let camposFuncionParametros = [];
    let camposFuncionParametrosLocales = []; 

    this.listCampos.map((campo,indice)=>{
      let tipoCampo = campo.tipoCampo.tipoBD === 'SEREAL' ? 'INTEGER':campo.tipoCampo.tipoBD;
      let consCampo = `IN ${tipoCampo}`;
      consCampo += campo.tipoCampo.longitud ? `(${campo.longitud})` : '';
      
      //parametros que recibe la funcion
      camposFuncionParametros.push(consCampo);

      //para las variables locales
      camposFuncionParametrosLocales.push(`${campo.campo}`);
    });

    camposAuditoriaFuncionParametros.map((campo,indice)=>{
      let campoAuditoria = this.listCamposAuditoria.find(campoAuditoria => campoAuditoria.campo === campo);
      campoAuditoria["tipoCampo"] = this.listTiposCampos.find(tipoCampo => campoAuditoria.codigotipo === tipoCampo.codigotipo);
  
      let consCampo = `IN ${campoAuditoria["tipoCampo"].tipoBD}`;
      consCampo += campoAuditoria["tipoCampo"].longitud ? `(${campoAuditoria.longitud})` : '';
      
      //parametros que recibe la funcion
      camposFuncionParametros.push(consCampo);

      //para las variables locales
      camposFuncionParametrosLocales.push(`${campoAuditoria.campo}`);
    });


    arrayTabla.push(`-- Function: public.${this.funcionesDatos.funcionActualiza.nombre}(${camposFuncionParametros.join(', ')});`);
    arrayTabla.push('');
    arrayTabla.push(`-- DROP FUNCTION public.${this.funcionesDatos.funcionActualiza.nombre}(${camposFuncionParametros.join(', ')});`);
    arrayTabla.push('');
    arrayTabla.push(`CREATE OR REPLACE FUNCTION public.${this.funcionesDatos.funcionActualiza.nombre}(${camposFuncionParametros.join(', ')})`);
    
    
    //return table 
    let camposRetorna = [];
    let camposRetornaUpdate = [];

    this.listCampos.map((campo,indice)=>{
      if(campo.tipoCampo.tipoBD === 'SEREAL')
      {
        let tipoCampo = campo.tipoCampo.tipoBD === 'SEREAL' ? 'INTEGER':'';
        let consCampo = `${campo.campo} ${tipoCampo}`;
        consCampo += campo.tipoCampo.longitud ? `(${campo.longitud})` : '';
        camposRetorna.push(consCampo);
        camposRetornaUpdate.push(`${campo.campo}`);
      }
    });
    
    arrayTabla.push(`\tRETURNS TABLE(${camposRetorna.join(', ')}) AS`);
    arrayTabla.push(`$BODY$`);
    arrayTabla.push(`DECLARE`);

    camposFuncionParametrosLocales.map((parametroLocal, index)=>{
      arrayTabla.push(`P_${parametroLocal} \t ALIAS FOR $${index+1};`);
    });

    arrayTabla.push(`BEGIN`);
    arrayTabla.push(``);
    arrayTabla.push(`RETURN QUERY`);
    arrayTabla.push(`UPDATE ${this.tablaDatos.nombre}`);
    arrayTabla.push(`SET`);

    let camposAActualizar = [];
    let camposAFiltrar = [];
    this.listCampos.map((campo,indice)=>{
      if(campo.tipoCampo.tipoBD !== 'SEREAL')
      {
        camposAActualizar.push(campo.campo)
      }
      else
      {
        camposAFiltrar.push(campo.campo);
      }
    });

    camposAuditoriaActualizarRegistrar.map((campo,indice)=>{
      camposAActualizar.push(campo);
    });
    
    

    let valorAActualizar = camposAActualizar.map(campo=>{
      switch(campo)
      {
        case "dfecmod" :{
          return 'now()'
        }
        break;
        default:{
          return `P_${campo}`
        }
        break;
      }
    });

    let columnasActualizar = camposAActualizar.map((campo,indice)=>{
      return  `${campo} = ${valorAActualizar[indice]}`
    }).join(',\n');

    arrayTabla.push(`${columnasActualizar}`);
    arrayTabla.push(`WHERE ${this.tablaDatos.nombre}.${camposAFiltrar.reduce(elemento=>elemento)} = P_${camposFuncionParametrosLocales[0]}`);
    arrayTabla.push(`RETURNING `);
    arrayTabla.push(`${camposRetornaUpdate.map(campo=>`${this.tablaDatos.nombre}.${campo}`).join(', ')};`);
    arrayTabla.push(``);

    arrayTabla.push(`END;`);
    arrayTabla.push(`$BODY$`);
    arrayTabla.push(`  LANGUAGE plpgsql VOLATILE SECURITY DEFINER`);
    arrayTabla.push(`  COST 100`);
    arrayTabla.push(`  ROWS 1000;`);
    arrayTabla.push(`ALTER FUNCTION public.${this.funcionesDatos.funcionActualiza.nombre}(${camposFuncionParametros.join(', ')})`);
    arrayTabla.push(`  OWNER TO rgensoftia;`);
    arrayTabla.push(`COMMENT ON FUNCTION public.${this.funcionesDatos.funcionActualiza.nombre}(${camposFuncionParametros.join(', ')}) IS '`);
    arrayTabla.push(`/***************************************************************************************************`);
    arrayTabla.push(`* COPYRIGHT ?? ${fechaActual.getFullYear()} CRAC CENTRO - All rights reserved.`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* OBJETIVO          : ${this.funcionesDatos.funcionActualiza.objetivo}`);
    arrayTabla.push(`* ESCRITO POR       : ${this.desarrollador.nombre}`);
    arrayTabla.push(`* EMAIL/MOVIL/PHONE : ${this.desarrollador.email}`);
    arrayTabla.push(`* FECHA CREACI??N    : ${fechaActual.toISOString().substring(0,10)}`);
    arrayTabla.push(`* SISTEMA / MODULO  : ${this.modulo.sistema} / ${this.modulo.modulo}`);
    arrayTabla.push(`* MODIFICACIONES    :`);
    arrayTabla.push(`* Fecha  	Responsable  	Descripcion del cambio`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* SINTAXIS DE EJEMPLO:`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* SELECT * FROM .${this.funcionesDatos.funcionActualiza.nombre}(${camposFuncionParametros.join(', ')})`);
    arrayTabla.push(`***************************************************************************************************/';`);
    arrayTabla.push(``);

    return arrayTabla;

  }

  funcionEliminaBD(){
    let fechaActual=new Date();

    this.definirCamposTotales();

    let camposAuditoriaFuncionParametros = ["cusumod","cipmodi"];
    let camposAuditoriaEliminarRegistrar = ["cusumod","cipmodi","dfecmod","lestado"];

    let arrayTabla = [];
    
    //====================================================================================================
    // FUNCION ELIMINAR
    //====================================================================================================

    let camposFuncionParametros = [];
    let camposFuncionParametrosLocales = []; 

    this.listCampos.map((campo,indice)=>{
      if(campo.tipoCampo.tipoBD === 'SEREAL')
      {
        let tipoCampo = campo.tipoCampo.tipoBD === 'SEREAL' ? 'INTEGER':campo.tipoCampo.tipoBD;
        let consCampo = `IN ${tipoCampo}`;
        consCampo += campo.tipoCampo.longitud ? `(${campo.longitud})` : '';
        
        //parametros que recibe la funcion
        camposFuncionParametros.push(consCampo);

        //para las variables locales
        camposFuncionParametrosLocales.push(`${campo.campo}`);
      }
    });

    camposAuditoriaFuncionParametros.map((campo,indice)=>{
      let campoAuditoria = this.listCamposAuditoria.find(campoAuditoria => campoAuditoria.campo === campo);
      campoAuditoria["tipoCampo"] = this.listTiposCampos.find(tipoCampo => campoAuditoria.codigotipo === tipoCampo.codigotipo);
  
      let consCampo = `IN ${campoAuditoria["tipoCampo"].tipoBD}`;
      consCampo += campoAuditoria["tipoCampo"].longitud ? `(${campoAuditoria.longitud})` : '';
      
      //parametros que recibe la funcion
      camposFuncionParametros.push(consCampo);

      //para las variables locales
      camposFuncionParametrosLocales.push(`${campoAuditoria.campo}`);
    });

    arrayTabla.push(`-- Function: public.${this.funcionesDatos.funcionElimina.nombre}(${camposFuncionParametros.join(', ')});`);
    arrayTabla.push('');
    arrayTabla.push(`-- DROP FUNCTION public.${this.funcionesDatos.funcionElimina.nombre}(${camposFuncionParametros.join(', ')});`);
    arrayTabla.push('');
    arrayTabla.push(`CREATE OR REPLACE FUNCTION public.${this.funcionesDatos.funcionElimina.nombre}(${camposFuncionParametros.join(', ')})`);
    
    //return table 
    let camposRetorna = [];
    let camposRetornaEliminar = [];

    this.listCampos.map((campo,indice)=>{
      if(campo.tipoCampo.tipoBD === 'SEREAL')
      {
        let tipoCampo = campo.tipoCampo.tipoBD === 'SEREAL' ? 'INTEGER':'';
        let consCampo = `${campo.campo} ${tipoCampo}`;
        consCampo += campo.tipoCampo.longitud ? `(${campo.longitud})` : '';
        camposRetorna.push(consCampo);
        camposRetornaEliminar.push(`${campo.campo}`);
      }
    });
    
    arrayTabla.push(`\tRETURNS TABLE(${camposRetorna.join(', ')}) AS`);
    arrayTabla.push(`$BODY$`);
    arrayTabla.push(`DECLARE`);

    camposFuncionParametrosLocales.map((parametroLocal, index)=>{
      arrayTabla.push(`P_${parametroLocal} \t ALIAS FOR $${index+1};`);
    });

    arrayTabla.push(`BEGIN`);
    arrayTabla.push(``);
    arrayTabla.push(`RETURN QUERY`);
    arrayTabla.push(`UPDATE ${this.tablaDatos.nombre}`);
    arrayTabla.push(`SET`);

    let camposAActualizar = [];
    let camposAFiltrar = [];
    this.listCampos.map((campo,indice)=>{
      if(campo.tipoCampo.tipoBD === 'SEREAL')
      {
        camposAFiltrar.push(campo.campo);
      }
    });

    camposAuditoriaEliminarRegistrar.map((campo,indice)=>{
      camposAActualizar.push(campo);
    });

    let valorAActualizar = camposAActualizar.map(campo=>{
      switch(campo)
      {
        case "dfecmod" :{
          return 'now()'
        }
        break;
        case "lestado" :{
          return 'FALSE'
        }
        break;
        default:{
          return `P_${campo}`
        }
        break;
      }
    });

    let columnasActualizar = camposAActualizar.map((campo,indice)=>{
      return  `${campo} = ${valorAActualizar[indice]}`
    }).join(',\n');

    arrayTabla.push(`${columnasActualizar}`);
    arrayTabla.push(`WHERE ${this.tablaDatos.nombre}.${camposAFiltrar.reduce(elemento=>elemento)} = P_${camposFuncionParametrosLocales[0]}`);
    arrayTabla.push(`RETURNING `);
    arrayTabla.push(`${camposRetornaEliminar.map(campo=>`${this.tablaDatos.nombre}.${campo}`).join(', ')};`);
    arrayTabla.push(``);

    arrayTabla.push(`END;`);
    arrayTabla.push(`$BODY$`);
    arrayTabla.push(`  LANGUAGE plpgsql VOLATILE SECURITY DEFINER`);
    arrayTabla.push(`  COST 100`);
    arrayTabla.push(`  ROWS 1000;`);
    arrayTabla.push(`ALTER FUNCTION public.${this.funcionesDatos.funcionElimina.nombre}(${camposFuncionParametros.join(', ')})`);
    arrayTabla.push(`  OWNER TO rgensoftia;`);
    arrayTabla.push(`COMMENT ON FUNCTION public.${this.funcionesDatos.funcionElimina.nombre}(${camposFuncionParametros.join(', ')}) IS '`);
    arrayTabla.push(`/***************************************************************************************************`);
    arrayTabla.push(`* COPYRIGHT ?? ${fechaActual.getFullYear()} CRAC CENTRO - All rights reserved.`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* OBJETIVO          : ${this.funcionesDatos.funcionElimina.objetivo}`);
    arrayTabla.push(`* ESCRITO POR       : ${this.desarrollador.nombre}`);
    arrayTabla.push(`* EMAIL/MOVIL/PHONE : ${this.desarrollador.email}`);
    arrayTabla.push(`* FECHA CREACI??N    : ${fechaActual.toISOString().substring(0,10)}`);
    arrayTabla.push(`* SISTEMA / MODULO  : ${this.modulo.sistema} / ${this.modulo.modulo}`);
    arrayTabla.push(`* MODIFICACIONES    :`);
    arrayTabla.push(`* Fecha  	Responsable  	Descripcion del cambio`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* SINTAXIS DE EJEMPLO:`);
    arrayTabla.push(`* `);
    arrayTabla.push(`* SELECT * FROM .${this.funcionesDatos.funcionElimina.nombre}(${camposFuncionParametros.join(', ')})`);
    arrayTabla.push(`***************************************************************************************************/';`);
    arrayTabla.push(``);

    return arrayTabla;

  }

  generarFuncionesBD(){
    let arrayListar = this.funcionListarBD();
    let arrayInsertar = this.funcionInsertarBD();
    let arrayActualiza = this.funcionActualizarBD();
    let arrayElimina = this.funcionEliminaBD();

    let arrayTabla =[];
    arrayTabla.push(...arrayListar);
    arrayTabla.push(...arrayInsertar);
    arrayTabla.push(...arrayActualiza);
    arrayTabla.push(...arrayElimina);
    arrayTabla = arrayTabla.flatMap(elemento=>[elemento,"\n"])

    //generando el archivo
    let blob = new Blob(arrayTabla, { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, 'creacionFunciones.sql');
  }
}