import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogicaService } from 'src/app/servicios/logica.service';
import { PagoModel } from 'src/app/modelos/pago.model';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private servicioLogica: LogicaService) {}

  ngOnInit() {
    this.ConstruirFormulario();
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      numeroTarjeta: ['', [Validators.required, Validators.minLength(15), Validators.maxLength(19), this.validarTarjeta]],
      nombreTitular: ['', [Validators.required]],
      mes: ['', [Validators.required]],
      ano: ['', [Validators.required]],
      cvc: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      planes: ['', [Validators.required]]
    });
  }

  RealizarPago() {
    let campos = this.ObtenerFormGroup;
    let datos = {
      numeroTarjeta: campos['numeroTarjeta'].value,
      nombreTitular: campos['nombreTitular'].value,
      mes: campos['mes'].value,
      ano: campos['ano'].value,
      cvc: campos['cvc'].value,
      direccion: campos['direccion'].value,
      planes: campos['planes'].value
    };
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

