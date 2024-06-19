import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { SeguridadService } from '../seguridad.service';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { BeneficiarioModel } from 'src/app/modelos/beneficiario.model';
import { PaginadorBeneficiarioModel } from 'src/app/modelos/paginador.beneficiario.model';
import { ClienteModel } from 'src/app/modelos/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {
  token = "";
  urlBase: string = ConfiguracionRutasBackend.urlLogica;
  constructor(private http: HttpClient, private servicioSeguridad: SeguridadService) {
    this.token = this.servicioSeguridad.ObtenerTokenLocalStorage();
  }

  listarRegistro(idCliente: number): Observable<BeneficiarioModel[]> {
    return this.http.get<BeneficiarioModel[]>(`${this.urlBase}beneficiario`).pipe(
        map(beneficiarios => beneficiarios.filter(b => b.idCliente === idCliente))
    );
}

  AgregarRegistro(registro: BeneficiarioModel):Observable<BeneficiarioModel>{
    return this.http.post(`${this.urlBase}beneficiario`, registro).pipe(
      catchError(err => {
        console.error(err);
        throw err;
      })
    );
  }

  EditarRegistro(registro: BeneficiarioModel):Observable<BeneficiarioModel>{
    return this.http.put(`${this.urlBase}beneficiario/${registro.id}`, registro);
  }

  ObtenerIdCliente(correo: string): Observable<ClienteModel>{
    return this.http.get<{registros: ClienteModel[], totalRegistros: number}>(`${this.urlBase}cliente?filter={"where":{"correo":"${correo}"}}`)
      .pipe(
        map(response => {
          if (response.registros && response.registros.length > 0) {
            return response.registros[0]; // return the first client
          } else {
            throw new Error('No client found with the provided email');
          }
        })
      );
  }
  
  BuscarRegistro(id: number): Observable<BeneficiarioModel>{
    return this.http.get<BeneficiarioModel>(`${this.urlBase}beneficiario/${id}`);
  }

  EliminarRegistro(id: number): Observable<any>{
    return this.http.delete<any>(`${this.urlBase}beneficiario/${id}`);
  }
}
