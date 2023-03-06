import { Component, OnInit } from '@angular/core';
import { ConexionService, Socio, Dir } from '../conexion.service';
import {Router, ActivatedRoute} from '@angular/router'; 

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit  {

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

  constructor(private ConexionService:ConexionService,
              private router:Router,
              private activeRoute:ActivatedRoute) { }

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

  }

  modificar()
  {

    this.ConexionService.editSocio(this.socio.SOCIO_ID || 0, this.socio).subscribe(
      res=>{
        console.log(res);
      },
      err=>console.log(err)
    );
    alert('Información actualizada');
    this.router.navigate(['/lista-socios']);
  }
    
}


