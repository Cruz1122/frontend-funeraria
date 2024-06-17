import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './publico/inicio/inicio.component';
import { RutaNoEncontradaComponent } from './publico/errores/ruta-no-encontrada/ruta-no-encontrada.component';
import { ErrorDeServidorComponent } from './publico/errores/error-de-servidor/error-de-servidor.component';
import { PaginaPlanesComponent } from './publico/pagina-planes/pagina-planes.component';

const routes: Routes = [
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'pagina-planes',
    component: PaginaPlanesComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'inicio'
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./modulos/seguridad/seguridad.module').then(m => m.SeguridadModule)
  },
  {
    path: 'logica-de-negocio',
    loadChildren: () => import('./modulos/logica-de-negocio/logica-de-negocio.module').then(m => m.LogicaDeNegocioModule)
  },
  {
    path: 'parametros',
    loadChildren: () => import('./modulos/parametros/parametros.module').then(m => m.ParametrosModule)
  },
  {
    path: 'ventas',
    loadChildren: () => import('./modulos/ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path: 'reportes',
    loadChildren: () => import('./modulos/reportes/reportes.module').then(m => m.ReportesModule)
  },
  {
    path: 'error-de-servidor',
    component: ErrorDeServidorComponent
  },
  {
    path: '**',
    component: RutaNoEncontradaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
