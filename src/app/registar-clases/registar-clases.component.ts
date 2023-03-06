import { Component, OnInit } from '@angular/core';
import { ConexionService, Socio, Clase, ClaseRe } from '../conexion.service';
import {Router, ActivatedRoute} from '@angular/router'; 

@Component({
  selector: 'app-registar-clases',
  templateUrl: './registar-clases.component.html',
  styleUrls: ['./registar-clases.component.css']
})
export class RegistarClasesComponent implements OnInit {

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

  ListarClases: Clase[];
  constructor(private ConexionService:ConexionService, private router:Router, private activeRoute:ActivatedRoute) {
      this.ListarClases = [];
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

    this.listarActividades();
    
  }

  listarActividades(){
    const id_entrada = <number>this.activeRoute.snapshot.params['id'];
    this.ConexionService.getClases(id_entrada).subscribe(
        res =>{
          
          this.ListarClases=<any>res;
          console.log(res)
        },
        err => console.log(err)
      );
  }

  agregar(claseId: number){
    const id_entrada = <number>this.activeRoute.snapshot.params['id'];
    this.claseRe.SOCIO_CLASE_SOCIO_ID = id_entrada;
    this.claseRe.SOCIO_CLASE_CLASE_ID = claseId;
    console.log(claseId)
    console.log(id_entrada)
    this.ConexionService.addClaseRe(this.claseRe,id_entrada).subscribe();
    alert('Clase agregada');

  }


}
