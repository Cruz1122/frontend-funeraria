import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SeguridadService } from '../seguridad.service';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { Observable, catchError } from 'rxjs';
import { RolModel } from 'src/app/modelos/rol.model';
import { PaginadorPlanModel } from 'src/app/modelos/paginador.plan.model';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { PaginadorRolModel } from 'src/app/modelos/paginador.rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  token = "";
  urlBase: string = ConfiguracionRutasBackend.urlSeguridad;
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObtenerTokenLocalStorage();
  }

  listarRegistro(): Observable<RolModel[]> {
    return this.http.get<RolModel[]>(`${this.urlBase}rol`);
  }
  /*listarRegistro(pag:number): Observable<PaginadorRolModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorRolModel>(`${this.urlBase}rol?filter={"limit":${limit}, "skip":${skip}, "order": "id DESC"}`);
  }*/

  AgregarRegistro(registro: RolModel):Observable<RolModel>{
    return this.http.post(`${this.urlBase}rol`, registro).pipe(
      catchError(err => {
        console.error(err);
        throw err;
      })
    );
  }

  EditarRegistro(registro: RolModel):Observable<RolModel>{
    return this.http.put(`${this.urlBase}rol/${registro._id}`, registro);
  }
  
  BuscarRegistro(id: string): Observable<RolModel>{
    return this.http.get<RolModel>(`${this.urlBase}rol/${id}`);
  }

  EliminarRegistro(id: string): Observable<any>{
    return this.http.delete<any>(`${this.urlBase}rol/${id}`);
  }
}
