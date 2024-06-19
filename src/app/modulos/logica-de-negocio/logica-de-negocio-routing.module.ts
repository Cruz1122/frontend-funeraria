import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PqrsComponent } from './pqrs/pqrs.component';
import { PagoComponent } from './pago/pago.component';
import { ServicioFunerarioComponent } from './servicio-funerario/servicio-funerario.component';

const routes: Routes = [
  {
    path: 'pqrs',
    component: PqrsComponent
  },
  {
    path: 'pago',
    component: PagoComponent
  },
  {
    path: 'servicio-funerario',
    component: ServicioFunerarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogicaDeNegocioRoutingModule { }
