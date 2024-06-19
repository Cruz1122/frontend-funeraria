import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { PaginadorClienteModel } from 'src/app/modelos/paginador.cliente.model';
import { SeguridadService } from '../seguridad.service';
import { ClienteModel } from 'src/app/modelos/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  token = "";
  urlBase: string = ConfiguracionRutasBackend.urlLogica;
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObtenerTokenLocalStorage();
  }

  listarPlanes(pag:number): Observable<PaginadorClienteModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    let url = `${this.urlBase}cliente?filter={"limit":${limit}, "skip":${skip}, "order": "id DESC"}`;
    return this.http.get<PaginadorClienteModel>(url);
  }

  AgregarRegistro(registro: ClienteModel):Observable<ClienteModel>{
    return this.http.post(`${this.urlBase}cliente`, registro).pipe(
      catchError(err => {
        console.error(err);
        throw err;
      })
    );
  }

  EditarRegistro(registro: ClienteModel):Observable<ClienteModel>{
    return this.http.put(`${this.urlBase}cliente/${registro.id}`, registro);
  }
  
  BuscarRegistro(id: number): Observable<ClienteModel>{
    return this.http.get<ClienteModel>(`${this.urlBase}cliente/${id}`);
  }

  EliminarRegistro(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlBase}cliente/${id}`);
  }

}
