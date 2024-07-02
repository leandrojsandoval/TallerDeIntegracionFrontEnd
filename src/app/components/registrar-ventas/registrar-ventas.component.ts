import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta/venta.service';
import { Venta,LineaDeVenta ,Producto} from 'src/app/models';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { FormBuilder, FormGroup } from '@angular/forms';
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

miFormulario: FormGroup;

successMessage: string | null = null;

cantidadform:number=0;
codigoform: string ="";

codigoProducto: string="";
cantidadProducto: number=0;

indexform=0;
constructor(private ventaService: VentaService,private productoService: ProductoService,private fb: FormBuilder) { 
  const today = new Date();
  this.miFormulario = this.fb.group({
    cliente: [''],
    productos: this.fb.array([]),
    Date: [this.formatDate(today)]
  });
} 


ngOnInit(): void {
}

formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

agregarProducto() {
  this.productoService.obtener_producto_by_codigo(this.codigoProducto).subscribe(
    producto => {
    if (producto) {
   
      const subtotal = this.cantidadProducto * producto.precio;
      this.venta.productos.push({
        id:this.generateId(),
        producto: {codigo: producto.codigo, descripcion:producto.descripcion, stock:producto.stock, activo: producto.activo, precio: producto.precio },
        cantidad: this.cantidadProducto,
        subtotal: subtotal,
        precioUnitario: producto.precio,
      });
      this.venta.total+=subtotal,
      this.codigoProducto = '';
      this.cantidadProducto = 0;
    } else {
      alert('Producto no encontrado');
    }
  });
}
private generateId(): number {
  return Math.floor(Math.random() * 1000000); // Genera un ID único basado en un número aleatorio
}

obtenerProducto(codigo: string, index: number): void {

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

calcularSubtotal(index: number): void {
  const item = this.venta?.productos[index];
  item.subtotal = item.cantidad * item.producto.precio;
  this.calcularTotal();
}

calcularTotal(): void {
  this.venta.total = this.venta.productos.reduce((acc, item) => acc + item.subtotal, 0);
}

onSubmit(): void {
  //  this.venta.cliente = this.cliente;
   this.venta.cliente = this.miFormulario.get('cliente')?.value;
  this.venta.fecha = new Date( this.miFormulario.get('Date')?.value);

  this.ventaService.crear_objetoVenta(this.venta).subscribe(
    data => {
      console.log("🚀 ~ RegistrarVentasComponent ~ onSubmit ~ data:", data);
      // alert('Venta registrada con éxito');
      this.venta.id=data.id;


      this.venta.productos.forEach(linea => {
        this.ventaService.crearLineaDeVenta(linea,this.venta.id).subscribe();
      });

      this.ventaService.actualizarStockProductosVenta(this.venta);
      this.resetForm();
    },
    error => {
      alert('Error al registrar la venta');
    }
  );

}

private resetForm(): void {
  this.cliente = '';
  this.venta = { id: 0, fecha: new Date(), cliente: '', productos: [], total: 0 ,rechazada:false};
}

eliminarProducto(index: number) {
  this.venta.productos.splice(index, 1);
this.calcularTotal();
}


}
