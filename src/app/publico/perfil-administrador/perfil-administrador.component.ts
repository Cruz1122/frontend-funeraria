import { Component } from '@angular/core';
import { ItemMenuModel } from 'src/app/modelos/item.menu.model copy';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-perfil-administrador',
  templateUrl: './perfil-administrador.component.html',
  styleUrls: ['./perfil-administrador.component.css'],
})
export class PerfilAdministradorComponent {
  listaMenus: ItemMenuModel[] = [];

  constructor(private servicioSeguridad: SeguridadService) {}

  ngOnInit() {
    this.listaMenus = this.servicioSeguridad.ObtenerItemsMenu();
  }
}
