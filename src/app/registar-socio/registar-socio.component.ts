import { Component, OnInit } from '@angular/core';
import { ConexionService, Socio, Dir } from '../conexion.service';
import { Router} from '@angular/router';

interface Pago {
  value: number;
  viewValue: string;
}

interface Estado {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-registar-socio',
  templateUrl: './registar-socio.component.html',
  styleUrls: ['./registar-socio.component.css']
})
export class RegistarSocioComponent implements OnInit {
  pagos: Pago[] = [
    {value: 1, viewValue: 'Anual'},
    {value: 2, viewValue: 'Mensual'},
    {value: 3, viewValue: 'Semanal  '},
  ];
  estados: Estado[] = [
    {value: 1, viewValue: 'Ciudad de México'},
    {value: 2, viewValue: 'Oaxaca'},
    {value: 3, viewValue: 'Estado de México'},
  ];

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

  direccion: Dir={
  
  DIRECCION_MUNICIPIO_ALCALDIA:'',
  DIRECCION_COLONIA:'',
  DIRECCION_CALLE:'',
  DIRECCION_NUM_INT:0,
  DIRECCION_NUM_EXT:0,
  DIRECCION_CP:0,
  DIRECCION_ESTADO_ID:0
    
  }

  constructor(private ConexionService:ConexionService, private router:Router) { }

  ngOnInit():void{
    
  }

  agregar(){

    delete this.direccion.DIRECCION_ID;
    if (this.socio.SOCIO_FECHA_INGRESO) {
      const fecha = new Date(this.socio.SOCIO_FECHA_INGRESO); // Convertir a objeto Date
      this.socio.SOCIO_FECHA_INGRESO = fecha.toISOString().substring(0, 10);
    }

    this.ConexionService.addDir(this.direccion).subscribe();
    console.log(this.direccion)
    
    this.ConexionService.addSocio(this.socio).subscribe();
    console.log(this.socio)
    alert('Socio Guardado');
    this.router.navigate(['/']);
  }


}
