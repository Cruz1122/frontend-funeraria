import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../modelos/usuario.model';
import { Observable } from 'rxjs';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlBase: string = ConfiguracionRutasBackend.urlSeguridad;
  constructor(private http: HttpClient) { }

  /**
   * Identificar usuario
   * @param usuario 
   * @param clave 
   * @returns Datos del usuario Valido
   */


  IdentificarUsuario(usuario: string, clave: string): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlBase}identificar-usuario`, {
      correo: usuario,
      clave: clave
    });
  }


  /**
   * 
   * @param usuarioId Validar codigo 2FA
   * @param codigo 
   * @returns 
   */
  ValidarCodigo2FA(usuarioId: string, codigo: string): Observable<object> {
    return this.http.post<object>(`${this.urlBase}verificar-2fa`, {
      idUsuario: usuarioId,
      codigo2fa: codigo
    });
  }

  /**
   * Almacenar datos del usuario identificado
   * @param datos datos del usuario identificado
   */
  AlmacenarDatosUsuarioIdentificado(datos: UsuarioModel): boolean {
    let cadena = JSON.stringify(datos);
    let datosLS = localStorage.getItem('datos-usuario');
    /**if (datosLS) {
      alert('Ya hay un usuario identificado');
      return false;
    } else {
      localStorage.setItem('datos-usuario', cadena);
      return true;
    }*/
    localStorage.setItem('datos-usuario', cadena);
      return true;
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
}
