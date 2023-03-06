import { Component, OnInit } from '@angular/core';
import { ConexionService, Socio } from '../conexion.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-lista-socios',
  templateUrl: './lista-socios.component.html',
  styleUrls: ['./lista-socios.component.css']
})
export class ListaSociosComponent implements OnInit  {

  ListarSocios: Socio[];
  constructor(private ConexionService:ConexionService, private router:Router) {
    this.ListarSocios = [];
   }

  ngOnInit():void{
    this.listarSocios();
  }

  listarSocios(){
    this.ConexionService.getSocios().subscribe(
        res =>{
          console.log(res)
          this.ListarSocios=<any>res;
        },
        err => console.log(err)
      );
  }

  eliminar(id:number)
  {
    this.ConexionService.deleteSocio(id).subscribe(
      res=>{
        alert('Socio eliminado');
         window.location.reload();
        this.listarSocios();
      },
      err=> console.log(err)
      );
  }

  modificar(id:number){
    this.router.navigate(['/editar/'+id]);
  }

  ver(id:number){
    this.router.navigate(['/lista-clases/'+id]);
  }

}
