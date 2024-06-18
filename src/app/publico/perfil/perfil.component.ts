import { Component } from '@angular/core';
import { ItemMenuModel } from 'src/app/modelos/item.menu.model copy';
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  listaMenus: ItemMenuModel[] = []

  constructor(
    private servicioSeguridad: SeguridadService,
  ) {

  }

  ngOnInit() {
    this.listaMenus = this.servicioSeguridad.ObtenerItemsMenu();
  }

}
