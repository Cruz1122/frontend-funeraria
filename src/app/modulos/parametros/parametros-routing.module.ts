import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPlanComponent } from './plan/listar-plan/listar-plan.component';
import { CrearPlanComponent } from './plan/crear-plan/crear-plan.component';
import { EliminarPlanComponent } from './plan/eliminar-plan/eliminar-plan.component';
import { EditarPlanComponent } from './plan/editar-plan/editar-plan.component';
import { ListarClienteComponent } from './cliente/listar-cliente/listar-cliente.component';
import { CrearClienteComponent } from './cliente/crear-cliente/crear-cliente.component';
import { EliminarClienteComponent } from './cliente/eliminar-cliente/eliminar-cliente.component';
import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { ListarBeneficiarioComponent } from './beneficiario/listar-beneficiario/listar-beneficiario.component';
import { CrearBeneficiarioComponent } from './beneficiario/crear-beneficiario/crear-beneficiario.component';
import { EliminarBeneficiarioComponent } from './beneficiario/eliminar-beneficiario/eliminar-beneficiario.component';
import { EditarBeneficiarioComponent } from './beneficiario/editar-beneficiario/editar-beneficiario.component';

const routes: Routes = [
  {
    path: "plan-listar",
    component: ListarPlanComponent
  },
  {
    path: "plan-agregar",
    component: CrearPlanComponent
  },
  {
    path: "plan-eliminar/:id",
    component: EliminarPlanComponent
  },
  {
    path: "plan-editar/:id",
    component: EditarPlanComponent
  },
  {
    path: "cliente-listar",
    component: ListarClienteComponent
  },
  {
    path: "cliente-agregar",
    component: CrearClienteComponent
  },
  {
    path: "cliente-eliminar/:id",
    component: EliminarClienteComponent
  },
  {
    path: "cliente-editar/:id",
    component: EditarClienteComponent
  },
  {
    path: "beneficiario-listar",
    component: ListarBeneficiarioComponent
  },
  {
    path: "beneficiario-agregar",
    component: CrearBeneficiarioComponent
  },
  {
    path: "beneficiario-eliminar/:id",
    component: EliminarBeneficiarioComponent
  },
  {
    path: "beneficiario-editar/:id",
    component: EditarBeneficiarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
