import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { CrearPlanComponent } from './plan/crear-plan/crear-plan.component';
import { EditarPlanComponent } from './plan/editar-plan/editar-plan.component';
import { EliminarPlanComponent } from './plan/eliminar-plan/eliminar-plan.component';
import { ListarPlanComponent } from './plan/listar-plan/listar-plan.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearBeneficiarioComponent } from './beneficiario/crear-beneficiario/crear-beneficiario.component';
import { EditarBeneficiarioComponent } from './beneficiario/editar-beneficiario/editar-beneficiario.component';
import { EliminarBeneficiarioComponent } from './beneficiario/eliminar-beneficiario/eliminar-beneficiario.component';
import { ListarBeneficiarioComponent } from './beneficiario/listar-beneficiario/listar-beneficiario.component';


@NgModule({
  declarations: [
    CrearClienteComponent,
    EliminarClienteComponent,
    EditarClienteComponent,
    ListarClienteComponent,
    CrearPlanComponent,
    EditarPlanComponent,
    EliminarPlanComponent,
    ListarPlanComponent,
    CrearBeneficiarioComponent,
    EditarBeneficiarioComponent,
    EliminarBeneficiarioComponent,
    ListarBeneficiarioComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ParametrosModule { }
