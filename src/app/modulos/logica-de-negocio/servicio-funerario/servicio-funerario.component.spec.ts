import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioFunerarioComponent } from './servicio-funerario.component';

describe('ServicioFunerarioComponent', () => {
  let component: ServicioFunerarioComponent;
  let fixture: ComponentFixture<ServicioFunerarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServicioFunerarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicioFunerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
