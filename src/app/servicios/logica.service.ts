import { Injectable } from '@angular/core';
import { ConfiguracionRutasBackend } from '../config/configuracion.rutas.backend';
import { PqrsModel } from '../modelos/pqrs.model';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class LogicaService {
  urlBase: string = ConfiguracionRutasBackend.urlLogica;
  constructor(private http: HttpClient) {}

  EnviarPQRS(datos: any) {
    return this.http.post<PqrsModel>(`${this.urlBase}pqrs`, datos);
  }
}
