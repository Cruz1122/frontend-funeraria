import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteModel } from 'src/app/modelos/cliente.model';
import { ClientePlanModel } from 'src/app/modelos/cliente.plan.model';
import { LogicaService } from 'src/app/servicios/logica.service';
import { SharedService } from 'src/app/servicios/shared.service';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from 'src/app/config/configuracion.rutas.backend';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private servicioLogica: LogicaService,
    private sharedService: SharedService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      numeroTarjeta: [
        '',
        [
          Validators.required,
          Validators.minLength(15),
          Validators.maxLength(19),
          this.validarTarjeta,
        ],
      ],
      nombreTitular: ['', [Validators.required]],
      mes: ['', [Validators.required]],
      ano: ['', [Validators.required]],
      cvc: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      plan: ['', [Validators.required]],
    });
  }

  RealizarPago() {
    let campos = this.ObtenerFormGroup;
    let datos_pago = {
      numeroTarjeta: campos['numeroTarjeta'].value,
      nombreTitular: campos['nombreTitular'].value,
      mes: campos['mes'].value,
      ano: campos['ano'].value,
      cvc: campos['cvc'].value,
      documento: campos['documento'].value,
      direccion: campos['direccion'].value,
      plan: campos['plan'].value,
    };
    
    if (this.fGroup.invalid) {
      alert('Por favor, complete todos los campos')
      return;
    }

    this.sharedService.currentData.subscribe((datos) => {
      if (datos) {
        datos.documento = datos_pago.documento;
        this.CrearCliente(datos);
      } else {
        return;
      }
    });

    this.CrearClientePlan(datos_pago);
  }

  CrearCliente(datos: any) {
    datos.nombre = datos.primerNombre;
    datos.apellidos = datos.primerApellido + ' ' + datos.segundoApellido;
    datos.estado = true;
    datos.fechaRegistro = new Date();
    delete datos.primerNombre,
      delete datos.segundoNombre,
      delete datos.primerApellido,
      delete datos.segundoApellido,
      delete datos.correo,
      delete datos.telefono,
      delete datos.lugarResidencia,
      delete datos.modoRecuperacionCuenta;
    delete datos.recaptcha;
    delete datos.fechaCreacion;

    this.servicioLogica.RegistrarCiente(datos).subscribe({});
  }

  CrearClientePlan(datos: any) {
    let plan = datos.plan;
    let datos_cliente_plan = {
      cuota: 'mensual',
      precioDefinido: 0,
      fechaInicio: new Date(),
      idCliente: null,
      idPlan: Number(datos.plan),
    };
    this.http
      .get(`${ConfiguracionRutasBackend.urlLogica}/plan/${plan}`)
      .subscribe((response: any) => {
        datos_cliente_plan.precioDefinido = response.precio;
      });

    this.http
      .get(`${ConfiguracionRutasBackend.urlLogica}/cliente/count`)
      .subscribe((response: any) => {
        datos_cliente_plan.idCliente = response.count;
        this.servicioLogica.RegistrarClientePlan(datos_cliente_plan).subscribe({
          next: (respuesta: ClientePlanModel) => {
            alert(
              'Registro correcto, se ha enviado un mensaje para validar su direccion de correo electronico'
            );
          },
          error: (err) => {
            alert('Se ha producido un error en el pago.');
          }
        });
      });
  }

  validarTarjeta(cardNumber: string): boolean {
    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));

      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 == 0;
  }
  get ObtenerFormGroup() {
    return this.fGroup.controls;
  }
}
