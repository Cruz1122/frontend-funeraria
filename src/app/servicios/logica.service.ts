import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { PqrsModel } from '../modelos/pqrs.model';
import { ClienteModel } from '../modelos/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PagoModel } from '../modelos/pago.model';
import { FacturacionModel } from '../modelos/facturacion.model';
import { ClientePlanModel } from '../modelos/cliente.plan.model';



@Injectable({
  providedIn: 'root',
})
export class LogicaService {
  urlBase: string = ConfiguracionRutasBackend.urlLogica;
  constructor(private http: HttpClient) {}

  EnviarPQRS(datos: any) {
    return this.http.post<PqrsModel>(`${this.urlBase}pqrs`, datos);
  }

  RegistrarCiente(datos: any): Observable<ClienteModel> {
    return this.http.post<ClienteModel>(
      `${this.urlBase}cliente`,
      datos
    );
  }

  RegistrarPago(datos: any): Observable<PagoModel> {
    return this.http.post<PagoModel>(`${this.urlBase}pago`, datos);
  }

  RegistrarFacturacion(datos: any): Observable<FacturacionModel> {
    return this.http.post<FacturacionModel>(
      `${this.urlBase}facturacion`,
      datos
    );
  }

  RegistrarClientePlan(datos: any): Observable<ClientePlanModel> {
    return this.http.post<ClientePlanModel>(
      `${this.urlBase}cliente-plan`,
      datos
    );
  }
}
