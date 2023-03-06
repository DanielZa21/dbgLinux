import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistarSocioComponent } from './registar-socio/registar-socio.component';
import { RegistarClasesComponent } from './registar-clases/registar-clases.component';
import { ListaSociosComponent } from './lista-socios/lista-socios.component';
import { EditarComponent } from './editar/editar.component';
import { ListaClasesComponent } from './lista-clases/lista-clases.component';

const routes: Routes = [
  { path: 'registar-socio', component: RegistarSocioComponent },
  { path: 'registar-clases/:id', component: RegistarClasesComponent },
  { path: 'lista-socios', component: ListaSociosComponent },
  { path: 'editar/:id', component: EditarComponent },
  { path: 'lista-clases/:id', component: ListaClasesComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
