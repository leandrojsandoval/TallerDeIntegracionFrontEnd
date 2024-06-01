import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarVentasComponent } from './buscar-ventas.component';

describe('BuscarVentasComponent', () => {
  let component: BuscarVentasComponent;
  let fixture: ComponentFixture<BuscarVentasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarVentasComponent]
    });
    fixture = TestBed.createComponent(BuscarVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
