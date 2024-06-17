import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPlanesComponent } from './pagina-planes.component';

describe('PaginaPlanesComponent', () => {
  let component: PaginaPlanesComponent;
  let fixture: ComponentFixture<PaginaPlanesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaPlanesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaPlanesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
