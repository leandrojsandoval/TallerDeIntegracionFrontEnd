import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Venta } from 'src/app/models';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-buscar-ventas',
  templateUrl: './buscar-ventas.component.html',
  styleUrls: ['./buscar-ventas.component.css']
})
export class BuscarVentasComponent implements OnInit {
  ventas: Venta[] = [];
  filterForm: FormGroup ;

  constructor(
    private fb: FormBuilder,
    private ventaService: VentaService
  ) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }
  ngOnInit(): void {
  }

  onSubmit() {
    const { startDate, endDate } = this.filterForm.value;
    this.ventaService.getVentasByDateRange(startDate, endDate).subscribe(ventas => {
      this.ventas = ventas;
    });
  }

  verDetalle(venta: Venta) {
    // Implementar lógica para ver detalle de la venta
    console.log(venta);
  }

}
