import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';
import { ArchivoModel } from 'src/app/modelos/archivo.model';
import { PlanModel } from 'src/app/modelos/plan.model';
import { ParametrosService } from 'src/app/servicios/parametros/plan.service';

@Component({
  selector: 'app-editar-plan',
  templateUrl: './editar-plan.component.html',
  styleUrls: ['./editar-plan.component.css']
})
export class EditarPlanComponent {
  nombreArchivoCargado: String = '';
  fGroup: FormGroup = new FormGroup({});
  cargaArchivoFG: FormGroup = new FormGroup({});
  archivoCargado: Boolean = false;
  BASE_URL: String = ConfiguracionRutasBackend.urlLogica;
  recordId: number = 0;

  constructor(
    private fb: FormBuilder,
    private servicio: ParametrosService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recordId = this.route.snapshot.params["id"];
   }

  ngOnInit(): void {
    this.ConstruirFormularioDatos();
    this.ConstruirFormularioArchivo();
    this.BuscarRegistro();

  }

  BuscarRegistro(){
    this.servicio.BuscarRegistro(this.recordId).subscribe({
      next: (datos: PlanModel) => {
        this.obtenerFgDatos["id"].setValue(datos.id);
        this.obtenerFgDatos["nombre"].setValue(datos.nombre);
        this.obtenerFgDatos["cantidadBeneficiarios"].setValue(datos.cantidadBeneficiarios);
        this.obtenerFgDatos["detalles"].setValue(datos.detalles);
        this.obtenerFgDatos["precio"].setValue(datos.precio);
        this.obtenerFgDatos["foto"].setValue(datos.foto);
        this.nombreArchivoCargado = datos.foto!;
        this.archivoCargado = true;
      },
      error: (err: any) => {
        alert("El registro no existe.");
      }
    })
  }

  ConstruirFormularioDatos() {
    this.fGroup = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      cantidadBeneficiarios: ['', [Validators.required]],
      detalles: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      foto: ['', [Validators.required]]
    });
  }

  EditarRegistro() {
    if (this.fGroup.invalid) {
      alert("Debe diligenciar todo el formulario, incluyendo la carga del archivo.");
    } else {
      let model = this.obtenerRegistro();
      this.servicio.EditarRegistro(model).subscribe({
        next: (data: PlanModel) => {
          alert("Información modificada correctamente");
          this.router.navigate(['/parametros/plan-listar']);
        },
        error: (err: any) => {
          alert("Ha ocurrido un error");
        }
      })
    }
  }

  obtenerRegistro(): PlanModel {
    let model = new PlanModel();
    model.id = parseInt(this.obtenerFgDatos["id"].value);
    model.nombre = this.obtenerFgDatos["nombre"].value;
    model.detalles = this.obtenerFgDatos["detalles"].value;
    model.cantidadBeneficiarios = this.obtenerFgDatos["cantidadBeneficiarios"].value;
    model.precio = this.obtenerFgDatos["precio"].value;
    model.foto = this.obtenerFgDatos["foto"].value;
    return model;
  }

  get obtenerFgDatos() {
    return this.fGroup.controls;
  }

  /** Carga de archivo */

  ConstruirFormularioArchivo() {
    this.cargaArchivoFG = this.fb.group({
      archivo: ['', []]
    });
  }

  get obtenerFgArchivo() {
    return this.cargaArchivoFG.controls;
  }

  CargarArchivo() {
    const formData = new FormData();
    formData.append('file', this.cargaArchivoFG.controls["archivo"].value);
    this.servicio.CargarArchivo(formData).subscribe({
      next: (data: ArchivoModel) => {
        console.log(data);
        this.nombreArchivoCargado = data.file;
        this.obtenerFgDatos["foto"].setValue(this.nombreArchivoCargado);
        this.archivoCargado = true;
        alert("Archivo cargado correctamente.");
      },
      error: (err: any) => {
        console.error(err);
        alert("Error cargando el archivo");
      }
    });
  }

  CuandoSeleccionaArchivo(event: any) {
    if (event.target.files.length > 0) {
      const f = event.target.files[0];
      this.obtenerFgArchivo["archivo"].setValue(f);
    }
  }

}
