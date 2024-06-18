import { Component } from '@angular/core';
import { PaginadorClienteModel } from 'src/app/modelos/paginador.cliente.model';
import { ClienteService } from 'src/app/servicios/parametros/cliente.service';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent {
  listarClientes: PaginadorClienteModel= new PaginadorClienteModel();
  pag = 1;
  constructor(
    private servicio: ClienteService
  ) { 

  }

  ngOnInit(){
    this.servicio.listarPlanes(this.pag).subscribe({
      next:(datos) => {
        this.listarClientes = datos;
      },
      error:(err) => {
        alert('Error leyendo la informacion de los planes.');
      }
    })
  }
}
