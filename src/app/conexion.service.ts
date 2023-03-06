import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  url='/api';
  url2='/api/dir';
  url3='/api/clase';
  url4='/api/claseRe';
  constructor(private http:HttpClient) { }

  getSocios(){
    return this.http.get(this.url);
  }

  getUnSocio(id:number){
    return this.http.get<Socio[]>(this.url+'/'+id);
  }
  
  addSocio(socio:Socio)
  {
    return this.http.post(this.url, socio);
  }

  //eliminar
  deleteSocio(id:number){
    return this.http.delete(this.url+'/'+id);
  }

  //modificar 
  editSocio(id:number, socio:Socio){
    return this.http.put(this.url+'/'+id, socio);
  }

  addDir(dir:Dir)
  {
    return this.http.post(this.url2, dir);
  }

  getClases(id:number){
    return this.http.get(this.url3+'/'+id);
  }

  getClasesRe(id:number){
    return this.http.get<Clase2[]>(this.url4+'/'+id);
  }

  addClaseRe(claseRe:ClaseRe,id:number)
  {
    return this.http.post(this.url4+'/'+id, claseRe);
  }

  deleteClase(claseRe: ClaseRe, id: number) {
  const url = `${this.url4}/${id}`;
  return this.http.delete(url, { body: claseRe })
}

}



export interface Socio{

  SOCIO_ID?:number;
  SOCIO_NOMBRE?:string;
  SOCIO_APELLIDO_PAT?:string;
  SOCIO_APELLIDO_MAT?:string;
  SOCIO_FECHA_INGRESO?:string;
  SOCIO_MATRICULA?:number;
  SOCIO_N_ESTACIONAMIENTO?:number;
  SOCIO_N_LOCKER?:number;
  SOCIO_PLAN_DE_PAGO_ID?:number;
  SOCIO_DIRECCION_ID?:number;

}

export interface Dir{

  DIRECCION_ID?:number;
  DIRECCION_MUNICIPIO_ALCALDIA?:string;
  DIRECCION_COLONIA?:string;
  DIRECCION_CALLE?:string;
  DIRECCION_NUM_INT?:number;
  DIRECCION_NUM_EXT?:number;
  DIRECCION_CP?:number;
  DIRECCION_ESTADO_ID?:number;

}

export interface Clase{

  CLASE_ID?:number;
  ACTIVIDAD_T_CLASE?:string;
  ENTRENADOR_NOMBRE?:string;
  ENTRENADOR_APELLIDO_PAT?:string;
  DIA_DIA?:string;
  HORA_INICIO?:string;
  HORA_FINAL?:string;
  ACTIVIDAD_COSTO?:number;

}

export interface ClaseRe{

  SOCIO_CLASE_CLASE_ID?:number;
  SOCIO_CLASE_SOCIO_ID?:number;

}

export interface Clase2{

  ACTIVIDAD_T_CLASE?:string;
  ENTRENADOR_NOMBRE?:string;
  ENTRENADOR_APELLIDO_PAT?:string;
  DIA_DIA?:string;
  HORA_INICIO?:string;
  HORA_FINAL?:string;
  ACTIVIDAD_COSTO?:number;

}