import { Component, OnInit } from '@angular/core';
import { ConexionService, Socio, Clase, ClaseRe } from '../conexion.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-lista-clases',
  templateUrl: './lista-clases.component.html',
  styleUrls: ['./lista-clases.component.css']
})
export class ListaClasesComponent implements OnInit {

  socio: Socio={

    SOCIO_NOMBRE:'',
    SOCIO_APELLIDO_PAT:'',
    SOCIO_APELLIDO_MAT:'',
    SOCIO_FECHA_INGRESO:'',
    SOCIO_MATRICULA:0,
    SOCIO_N_ESTACIONAMIENTO:0,
    SOCIO_N_LOCKER:0,
    SOCIO_PLAN_DE_PAGO_ID:0,

  }

  claseRe: ClaseRe={

  SOCIO_CLASE_CLASE_ID:0,
  SOCIO_CLASE_SOCIO_ID:0,

  }

  ListarClasesR: Clase[];
  totalPrecio: number = 0; // variable para almacenar el valor total de la columna precio

  constructor(private ConexionService:ConexionService, private router:Router, private activeRoute:ActivatedRoute) {
      this.ListarClasesR = [];
   }

  ngOnInit():void{
    const id_entrada = <number>this.activeRoute.snapshot.params['id'];
    console.log('id de entrada: '+id_entrada);

    if(id_entrada){
      this.ConexionService.getUnSocio(id_entrada).subscribe(
        res=>{
          this.socio = res[0];
          console.log(res[0]);
        },
        err=>console.log(err)
      );
    }

    this.listarClasesR(id_entrada);
  }

  clases(id:number){
    this.router.navigate(['/registar-clases/'+id]);
  }

  listarClasesR(id:number){
    this.ConexionService.getClasesRe(id).subscribe(
        res =>{
          console.log(res)
          this.ListarClasesR=<any>res;
          // calcular el valor total de la columna precio
          this.totalPrecio = 0;
          for (let clase of this.ListarClasesR) {
            this.totalPrecio += clase.ACTIVIDAD_COSTO|| 0;
          }
        },
        err => console.log(err)
      );
  }

   eliminar(claseId: number )
  {

    const id_entrada = <number>this.activeRoute.snapshot.params['id'];
    this.claseRe.SOCIO_CLASE_SOCIO_ID = id_entrada;
    this.claseRe.SOCIO_CLASE_CLASE_ID = claseId;
    console.log(this.claseRe.SOCIO_CLASE_SOCIO_ID)
    console.log(this.claseRe.SOCIO_CLASE_CLASE_ID)
    this.ConexionService.deleteClase(this.claseRe,id_entrada).subscribe(
      res=>{
        alert('Clase eliminada');
         //window.location.reload();
      },
      err=> console.log(err)
      );
  }

}
