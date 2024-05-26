import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PqrsComponent } from './pqrs/pqrs.component';

const routes: Routes = [
  {
    path: 'pqrs',
    component: PqrsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogicaDeNegocioRoutingModule { }
