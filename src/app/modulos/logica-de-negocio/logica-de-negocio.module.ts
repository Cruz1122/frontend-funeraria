import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogicaDeNegocioRoutingModule } from './logica-de-negocio-routing.module';
import { PqrsComponent } from './pqrs/pqrs.component';


@NgModule({
  declarations: [
    PqrsComponent
  ],
  imports: [
    CommonModule,
    LogicaDeNegocioRoutingModule
  ]
})
export class LogicaDeNegocioModule { }
