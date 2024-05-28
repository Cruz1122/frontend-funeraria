import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PqrsComponent } from './pqrs/pqrs.component';
import { PagoComponent } from './pago/pago.component';

const routes: Routes = [
  {
    path: 'pqrs',
    component: PqrsComponent
  },
  {
    path: 'pago',
    component: PagoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogicaDeNegocioRoutingModule { }
