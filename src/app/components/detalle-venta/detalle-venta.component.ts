import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineaDeVenta, Venta } from 'src/app/models';
import { VentaService } from 'src/app/services/venta/venta.service';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css']
})
export class DetalleVentaComponent implements OnInit {
  venta: Venta = {} as Venta;
  Totales:number=0;
  lineasVenta: LineaDeVenta[]=[];
  LineasVentaproductoSinDuplicados: LineaDeVenta[] =[] ; 

  constructor(private activatedRoute: ActivatedRoute, private ventasService: VentaService) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      const ventaId = params['id'];
  
      this.ventasService.getVentaPorIdVenta(ventaId) .subscribe(data => {
        this.venta = data;
  
     console.log(data)

      });
      this.ventasService.getLineaVentaPorIdVenta(ventaId)
      .subscribe(lineasVenta => {
        this.lineasVenta = lineasVenta;
        
      this.obtenerListadosUnficados();
     console.log(this.LineasVentaproductoSinDuplicados)

      });

    });
  }

  private obtenerListadosUnficados() {
    this.LineasVentaproductoSinDuplicados = this.lineasVenta.reduce((acumulador: LineaDeVenta[], valorActual: LineaDeVenta) => {
      this.Totales += valorActual.subtotal;
      const elementoYaExiste = acumulador.find(elemento => elemento.producto.codigo.toUpperCase() === valorActual.producto.codigo.toUpperCase());
      if (elementoYaExiste) {
        return acumulador.map((elemento) => {

          if (elemento.producto.codigo.toUpperCase() === valorActual.producto.codigo.toUpperCase()) {

            return {
              ...elemento,
              cantidad: elemento.cantidad + valorActual.cantidad,
              subtotal: elemento.subtotal + valorActual.subtotal
            };
          }
          return elemento;
        });
      } else {
        return [...acumulador, valorActual];
      }
    }, []);
  }
}
