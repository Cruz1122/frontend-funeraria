import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { ErrorDeServidorComponent } from 'src/app/publico/errores/error-de-servidor/error-de-servidor.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IdentificacionTwofaComponent } from './identificacion-twofa/identificacion-twofa.component';
import { RegistroPublicoUsuariosComponent } from './registro-publico-usuarios/registro-publico-usuarios.component';
import { ValidarHashUsuarioPublicoComponent } from './validar-hash-usuario-publico/validar-hash-usuario-publico.component';
import { ValidarSesionInactivaGuard } from 'src/app/guardianes/validar-sesion-inactiva.guard';
import { ValidarSesionActivaGuard } from 'src/app/guardianes/validar-sesion-activa.guard';
import { CrearUsuarioComponent } from './usuario/crear-usuario/crear-usuario.component';
import { ListarUsuarioComponent } from './usuario/listar-usuario/listar-usuario.component';
import { EditarClienteComponent } from '../parametros/cliente/editar-cliente/editar-cliente.component';
import { EliminarClienteComponent } from '../parametros/cliente/eliminar-cliente/eliminar-cliente.component';
import { CrearRolComponent } from './rol/crear-rol/crear-rol.component';
import { ListarRolComponent } from './rol/listar-rol/listar-rol.component';
import { EditarRolComponent } from './rol/editar-rol/editar-rol.component';
import { EliminarRolComponent } from './rol/eliminar-rol/eliminar-rol.component';

const routes: Routes = [
  {
    path: 'identificar-usuario',
    component: IdentificacionUsuarioComponent,
    canActivate: [ValidarSesionInactivaGuard],
  },
  {
    path: 'cambiar-clave',
    component: CambioClaveComponent,
    canActivate: [ValidarSesionActivaGuard],
  },
  {
    path: 'recuperar-clave',
    component: RecuperarClaveComponent,
    canActivate: [ValidarSesionInactivaGuard],
  },
  {
    path: 'cerrar-sesion',
    component: CerrarSesionComponent,
    canActivate: [ValidarSesionActivaGuard],
  },
  {
    path: '2fa',
    component: IdentificacionTwofaComponent,
    canActivate: [ValidarSesionInactivaGuard],
  },
  {
    path: 'registro-publico',
    component: RegistroPublicoUsuariosComponent,
    canActivate: [ValidarSesionInactivaGuard],
  },
  {
    path: 'validar-hash-usuario-publico/:hash',
    component: ValidarHashUsuarioPublicoComponent,
    canActivate: [ValidarSesionInactivaGuard],
  },
  {
    path: 'usuario-crear',
    component: CrearUsuarioComponent
  },
  {
    path: 'usuario-listar',
    component: ListarUsuarioComponent
  },
  {
    path: 'usuario-editar/:id',
    component: EditarClienteComponent
  },
  {
    path: 'usuario-eliminar/:id',
    component: EliminarClienteComponent
  },
  {
    path: 'rol-crear',
    component: CrearRolComponent
  },
  {
    path: 'rol-listar',
    component: ListarRolComponent
  },
  {
    path: 'rol-editar/:id',
    component: EditarRolComponent
  },
  {
    path: 'rol-eliminar/:id',
    component: EliminarRolComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SeguridadRoutingModule {}
