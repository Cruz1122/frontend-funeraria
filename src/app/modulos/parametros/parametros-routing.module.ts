import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPlanComponent } from './plan/listar-plan/listar-plan.component';

const routes: Routes = [
  {
    path: "plan-listar",
    component: ListarPlanComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }
