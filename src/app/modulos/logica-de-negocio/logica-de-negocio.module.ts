import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogicaDeNegocioRoutingModule } from './logica-de-negocio-routing.module';
import { PqrsComponent } from './pqrs/pqrs.component';
import { PagoComponent } from './pago/pago.component';


@NgModule({
  declarations: [
    PqrsComponent,
    PagoComponent
  ],
  imports: [
    CommonModule,
    LogicaDeNegocioRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LogicaDeNegocioModule { }
