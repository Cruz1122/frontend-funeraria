import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../modelos/usuario.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { delay } from 'rxjs';
import { UsuarioValidadoModel } from '../modelos/usuario.validado.model';
import { PermisoModel } from '../modelos/permiso.model';
import { ItemMenuModel } from '../modelos/item.menu.model copy';
import { ConfiguracionMenuLateral } from '../config/configuracion.menu';

@Injectable({
  providedIn: 'root',
})
export class SeguridadService {
  urlBase: string = ConfiguracionRutasBackend.urlSeguridad;
  constructor(private http: HttpClient) {
    this.validacionDeSesion();
  }

  /**
   * Identificar usuario
   * @param usuario
   * @param clave
   * @returns Datos del usuario Valido
   */

  IdentificarUsuario(usuario: string, clave: string): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlBase}identificar-usuario`, {
      correo: usuario,
      clave: clave,
    });
  }

  /**
   *
   * @param usuarioId Validar codigo 2FA
   * @param codigo
   * @returns
   */
  ValidarCodigo2FA(
    usuarioId: string,
    codigo: string
  ): Observable<UsuarioValidadoModel> {
    return this.http.post<UsuarioValidadoModel>(
      `${this.urlBase}verificar-2fa`,
      {
        idUsuario: usuarioId,
        codigo2fa: codigo,
      }
    );
  }

  RegistrarUsuarioPublico(datos: any): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlBase}usuario-publico`, datos);
  }

  ValidarHashUsuarioPublico(hash: string): Observable<boolean> {
    return this.http
      .post<boolean>(`${this.urlBase}validar-hash-usuario`, {
        codigoHash: hash,
      })
      .pipe(delay(3000));
  }

  /**
   * Almacenar datos del usuario identificado
   * @param datos datos del usuario identificado
   */
  AlmacenarDatosUsuarioIdentificado(datos: UsuarioModel): boolean {
    let cadena = JSON.stringify(datos);
    let datosLS = localStorage.getItem('datos-usuario');
    if (datosLS) {
      alert('Ya hay un usuario identificado');
      return false;
    } else {
      localStorage.setItem('datos-usuario', cadena);
      return true;
    }
  }

  /**
   *
   * @returns Busca los datos en un Localtorage
   */
  ObternetDatosUsuarioLS(): UsuarioModel | null {
    let datosLS = localStorage.getItem('datos-usuario');
    if (datosLS) {
      let datos = JSON.parse(datosLS);
      return datos;
    } else {
      return null;
    }
  }

  /**
   * Guarda en local storage la información del usuario validado
   * @param datos datos del usuario validado
   * @returns respuesta
   */

  AlmacenarDatosUsuarioValidado(datos: UsuarioValidadoModel): boolean {
    let datosLS = localStorage.getItem('datos-sesion');

    if (datosLS != null) {
      return false;
    } else {
      let datosString = JSON.stringify(datos);
      localStorage.setItem('datos-sesion', datosString);
      this.ActualizarComportamientoUsuario(datos);
      return true;
    }
  }

  /**
   * Cerrando sesión
   */
  RemoverDatosUsuarioValidado() {
    let datosUsuario = localStorage.getItem('datos-usuario');
    let datosSesion = localStorage.getItem('datos-sesion');

    if (datosUsuario) {
      localStorage.removeItem('datos-usuario');
    }
    if (datosSesion) {
      localStorage.removeItem('datos-sesion');
    }

    this.ActualizarComportamientoUsuario(new UsuarioValidadoModel());
  }

  RecuperarClavePorUsuario(correo: string): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlBase}recuperar-clave`, {
      correo: correo,
    });
  }

  /** Administación de la sesión de usuario */
  datosUsuarioValidado = new BehaviorSubject<UsuarioValidadoModel>(
    new UsuarioValidadoModel()
  );

  ObtenerDatosSesion(): Observable<UsuarioValidadoModel> {
    return this.datosUsuarioValidado.asObservable();
  }

  validacionDeSesion(): UsuarioValidadoModel | null {
    let ls = localStorage.getItem('datos-sesion');
    if (ls) {
      let objUsuario = JSON.parse(ls);
      this.ActualizarComportamientoUsuario(objUsuario);
      return objUsuario;
    }
    return null;
  }

  ActualizarComportamientoUsuario(datos: UsuarioValidadoModel) {
    return this.datosUsuarioValidado.next(datos);
  }

  ConstruirMenu(permisos: PermisoModel[]) {
    let menu: ItemMenuModel[] = [];

    permisos.forEach((permiso) => {
      console.log(permiso.idPermisos);
      let datosRuta = ConfiguracionMenuLateral.listaMenus.filter(x => x.id == permiso.idPermisos);
      
      if (datosRuta.length > 0) {
        let item = new ItemMenuModel();
        item.idMenu = permiso.idPermisos;
        item.ruta = datosRuta[0].ruta;
        item.icono = datosRuta[0].icono;
        item.texto = datosRuta[0].texto;
        menu.push(item);
      }

    })
    this.AlmacenarItemsMenu(menu)

  }

  /**
   * 
   * @param itemsMenu Almacena los items del menu en el localstorage
   */
  AlmacenarItemsMenu(itemsMenu: ItemMenuModel[]) {
    let menuStr = JSON.stringify(itemsMenu);
    localStorage.setItem('menu', menuStr);
  }

 /**
  * 
  * @returns Lista con items del menu
  */
  ObtenerItemsMenu(): ItemMenuModel[] {
    let menu: ItemMenuModel[] = [];
    let menuStr = localStorage.getItem('menu');
    if (menuStr) {
      menu = JSON.parse(menuStr);
    }
    return menu;
  }

}