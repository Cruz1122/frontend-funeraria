import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolModel } from 'src/app/modelos/rol.model';
import { RolService } from 'src/app/servicios/parametros/rol.service';

@Component({
  selector: 'app-crear-rol',
  templateUrl: './crear-rol.component.html',
  styleUrls: ['./crear-rol.component.css']
})
export class CrearRolComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicio: RolService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.ConstruirFormularioDatos();
  }

  ConstruirFormularioDatos() {
    this.fGroup = this.fb.group({
      nombre: ['', [Validators.required]],
      comentarios: ['', [Validators.required]],
    });
  }

  GuardarRegistro() {
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario.");
    } else {
      let model = this.obtenerRegistro();
      console.log(model);
      this.servicio.AgregarRegistro(model).subscribe({
        next: (data: RolModel) => {
          alert("Información almacenada correctamente");
          this.router.navigate(['/seguridad/rol-listar']);
        },
        error: (err: any) => {
          alert("Ha ocurrido un error");
        }
      })
    }
  }

  obtenerRegistro(): RolModel {
    let model = new RolModel();
    model.nombre = this.obtenerFgDatos["nombre"].value;
    model.comentarios = this.obtenerFgDatos["comentarios"].value;
    return model;
}

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }
}
