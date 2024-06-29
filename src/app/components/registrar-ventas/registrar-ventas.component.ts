import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta/venta.service';
import { Venta,LineaDeVenta ,Producto} from 'src/app/models';
import { ProductoService } from 'src/app/services/producto/producto.service';
// src/app/models/venta.ts

@Component({
  selector: 'app-registrar-ventas',
  templateUrl: './registrar-ventas.component.html',
  styleUrls: ['./registrar-ventas.component.css']
})

export class RegistrarVentasComponent  implements OnInit{

cliente: string = '';

venta: Venta = { id: 0, fecha: new Date(), cliente: '', productos: [], total: 0, rechazada: false };

producto: Producto = {} as Producto;

errorMessage: string | null = null;

successMessage: string | null = null;

constructor(private ventaService: VentaService,private productoService: ProductoService) { } 

ngOnInit(): void {
}

agregarProducto() {
  const nuevoProducto: LineaDeVenta = {
    id: this.generateId(),
    producto: { codigo: '', descripcion: '', stock: 0, activo: true, precio: 0 },
    cantidad: 0,
    subtotal: 0,
    precioUnitario: 0
  };
  this.venta.productos.push(nuevoProducto);
}

private generateId(): number {
  return Math.floor(Math.random() * 1000000); // Genera un ID único basado en un número aleatorio
}


// eliminarProducto(index: number): void {
//   this.venta?.productos.splice(index, 1);
// }

obtenerProducto(codigo: string, index: number): void {
  // this.ventaService.getProductoPorCodigo(codigo).subscribe(
  //   producto => {
  //     this.venta.productos[index].producto = producto;
  //   },
  //   error => {
  //     alert('Producto no encontrado');
  //     this.venta.productos[index].producto = { codigo: '', descripcion: '', precio: 0, stock: 0 ,activo:true};
  //   }
  // );

  this.productoService.obtener_producto_by_codigo(codigo).subscribe(
    producto => {
      this.venta.productos[index].producto = producto;
    },
    error => {
      this.errorMessage=error;
      alert('Producto no encontrado');
      this.venta.productos[index].producto = { codigo: '', descripcion: '', precio: 0, stock: 0 ,activo:true};
    }
  );
}

// obtenerProducto(codigo: string, index: number) {
//   this.ventaService.getProductoByCodigo(codigo).subscribe(producto => {
//     this.venta.productos[index].producto = producto;
//     this.venta.productos[index].precioUnitario = producto.precio;
//     this.calcularSubtotal(index);
//   });
// }
calcularSubtotal(index: number): void {
  const item = this.venta?.productos[index];
  item.subtotal = item.cantidad * item.producto.precio;
  this.calcularTotal();
}
calcularTotal(): void {
  this.venta.total = this.venta.productos.reduce((acc, item) => acc + item.subtotal, 0);
}

onSubmit(): void {
  this.venta.cliente = this.cliente;
  this.venta.fecha = new Date();
  debugger
  this.ventaService.crear_objetoVenta(this.venta).subscribe(
    data => {
      console.log("🚀 ~ RegistrarVentasComponent ~ onSubmit ~ data:", data);
      // alert('Venta registrada con éxito');
      this.venta.id=data.id;


      this.venta.productos.forEach(linea => {
        this.ventaService.crearLineaDeVenta(linea,this.venta.id).subscribe();
      });

      this.ventaService.actualizarStockProductosVenta(this.venta);
      // this.resetForm();
    },
    error => {
      alert('Error al registrar la venta');
    }
  );
  // this.ventaService.registrarVenta(this.venta).subscribe(
  //   venta => {
  //     // alert('Venta regilineaDeVenta: LineaDeVenta, id: number, id: numberthis.resetForm();
  //   },
  //   error => {
  //     alert('Error al registrar la venta');
  //   }
  // );
}

private resetForm(): void {
  this.cliente = '';
  this.venta = { id: 0, fecha: new Date(), cliente: '', productos: [], total: 0 ,rechazada:false};
}

eliminarProducto(id: number): void {
  this.venta.productos = this.venta.productos.filter(producto => producto.id !== id);
  this.calcularTotal();
}


}
