import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EncabezadoComponent } from './publico/pagina-maestra/encabezado/encabezado.component';
import { PiePaginaComponent } from './publico/pagina-maestra/pie-pagina/pie-pagina.component';
import { MenuLateralComponent } from './publico/pagina-maestra/menu-lateral/menu-lateral.component';
import { RutaNoEncontradaComponent } from './publico/errores/ruta-no-encontrada/ruta-no-encontrada.component';
import { ErrorDeServidorComponent } from './publico/errores/error-de-servidor/error-de-servidor.component';
import { InicioComponent } from './publico/inicio/inicio.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgxCaptchaModule } from 'ngx-captcha';
import { PaginaPlanesComponent } from './publico/pagina-planes/pagina-planes.component';
import { PerfilComponent } from './publico/perfil/perfil.component';
import { PerfilAdministradorComponent } from './publico/perfil-administrador/perfil-administrador.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EncabezadoComponent,
    PiePaginaComponent,
    MenuLateralComponent,
    RutaNoEncontradaComponent,
    ErrorDeServidorComponent,
    InicioComponent,
    PaginaPlanesComponent,
    PerfilComponent,
    PerfilAdministradorComponent
  ],
  imports: [
    BrowserModule,
    NgxCaptchaModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
