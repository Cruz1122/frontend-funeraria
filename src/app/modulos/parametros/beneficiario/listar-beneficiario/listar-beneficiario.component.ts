import { Component } from '@angular/core';
import { ConfiguracionPaginacion } from 'src/app/config/configuracion.paginacion';
import { BeneficiarioModel } from 'src/app/modelos/beneficiario.model';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { UsuarioModel } from 'src/app/modelos/usuario.model';
import { BeneficiarioService } from 'src/app/servicios/parametros/beneficiario.service';

@Component({
  selector: 'app-listar-beneficiario',
  templateUrl: './listar-beneficiario.component.html',
  styleUrls: ['./listar-beneficiario.component.css']
})
export class ListarBeneficiarioComponent {
  idCliente: number = 0;
  cliente: ClienteModel = new ClienteModel();
  datosUsuario: UsuarioModel = new UsuarioModel();
  listarBeneficiarios: BeneficiarioModel[]= [];
  pag = 1;
  total = 0;
  registrosPorPagina = ConfiguracionPaginacion.registroPorPagina;

  constructor(
    private servicio: BeneficiarioService
  ) { 

  }

  ngOnInit(){
    this.datosUsuario = this.getDatosUsuario();
    this.idCliente = this.obtenerIdCliente(this.datosUsuario.correo);
    console.log(this.datosUsuario);
    this.ListarRegistros();
  }

  getDatosUsuario() {
    const datosUsuario = localStorage.getItem('datos-usuario');
    return datosUsuario ? JSON.parse(datosUsuario) : null;
  }

  ListarRegistros(){
    this.servicio.listarRegistro(201).subscribe({
      next:(datos) => {
        this.listarBeneficiarios = datos;
      },
      error:(err) => {
        alert('Error leyendo la informacion de los planes.');
      }
    })
  }

  obtenerIdCliente(correo: string | undefined): number {
    if (correo) {
      this.servicio.ObtenerIdCliente(correo).subscribe({
        next:(datos) => {
          this.cliente = datos;
          return this.cliente.id;
        },
        error:(err) => {
          alert('Error leyendo la informacion de los planes.');
        }
      })
    }
    
    return 0;
  }
}