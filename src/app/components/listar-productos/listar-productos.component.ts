import { Component } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent {
  responseData: any;
  constructor(private productosService: ProductoService) { }

  ngOnInit(): void {
    this.productosService.listar_productos ().subscribe(data => {
      this.responseData = data;
      console.log("🚀 ~ ListarProductosComponent ~ this.productosService.listar_productos ~ responseData:",  this.responseData)
      
    });
  }
}
