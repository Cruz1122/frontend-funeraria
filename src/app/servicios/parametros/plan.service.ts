import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { ConfiguracionPaginacion } from '../../config/configuracion.paginacion';
import { PlanModel } from '../../modelos/plan.model';
import { PaginadorPlanModel } from 'src/app/modelos/paginador.plan.model';

@Injectable({
  providedIn: 'root',
})
export class ParametrosService {
  urlBase: string = ConfiguracionRutasBackend.urlLogica;
  constructor(private http: HttpClient) {}

  /**
   * Listado de planes
   * @returns Lista de planes
   */
  listarPlanes(): Observable<PlanModel[]> {
    return this.http.get<PlanModel[]>(`${this.urlBase}plan?filter={"limit":${ConfiguracionPaginacion.planesPorPagina}}`);
  }

  listarPlanesTodos(): Observable<PlanModel[]> {
    return this.http.get<PlanModel[]>(`${this.urlBase}plan`);
  }
  listarPlanesTodosPaginados(pag:number): Observable<PaginadorPlanModel> {
    let limit = ConfiguracionPaginacion.registroPorPagina;
    let skip = (pag - 1) * limit;
    return this.http.get<PaginadorPlanModel>(`${this.urlBase}plan-paginado?filter={"limit":${limit}, "skip":${skip}}`);
  }
}
