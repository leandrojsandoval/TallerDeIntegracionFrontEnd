import { Component, OnInit } from '@angular/core';
import { VentaService } from 'src/app/services/venta/venta.service';
import { Venta,LineaDeVenta ,Producto} from 'src/app/models';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
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

cantidadform:number=1;
codigoform: string ="";
clienteform: string = '';
codigoProducto: string="";
cantidadProducto: number=1;

indexform=0;
constructor(private ventaService: VentaService,private productoService: ProductoService,private fb: FormBuilder) { 
  const today = new Date();
  this.miFormulario = this.fb.group({
    cliente: [''],
    productos: this.fb.array([]),
    Date: [this.formatDate(today)],
    Time:this.formatTime(today)
  });
} 



ngOnInit(): void {
}

formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
formatTime(date: Date): string{
  const currentHour = date.getHours().toString().padStart(2, '0');
  const currentMinute = date.getMinutes().toString().padStart(2, '0');
  const currentSecond = date.getSeconds().toString().padStart(2, '0');
  const formattedTime = `${currentHour}:${currentMinute}:${currentSecond}`;
  return formattedTime;
}

agregarProducto() {
  debugger
  if(this.codigoProducto==null ||this.codigoProducto==''){
    this.errorMessage = 'Formulario inválido-Codigo de producto no ingresado';
    return;
  }

  this.productoService.obtener_producto_by_codigo(this.codigoProducto).subscribe(
    producto => {
    if (producto) {
	if (this.cantidadProducto <=0){
		alert('La cantidad ingresada no es valida');
	}
	else{
   	if (producto.stock>0){

    let productoEnLista: Producto = this.venta.productos.filter(x => x.producto.codigo == producto.codigo)
    .reduce((acc, curr) => {
        acc.stock += curr.cantidad;
        return acc;
    }, { ...producto, stock: 0 });
// debugger
    if (productoEnLista && this.cantidadProducto > (producto.stock - productoEnLista.stock)) {
    this.cantidadProducto = producto.stock- productoEnLista.stock;
      if (this.cantidadProducto ==0){
        alert('Producto sin stock' );
        return;
      }
    alert('No hay stock suficiente para vender la cantidad solicitada, se modificó la cantidad automáticamente a ' + (producto.stock- productoEnLista.stock));
    }
    if (!productoEnLista && producto.stock<this.cantidadProducto){
      this.cantidadProducto = producto.stock
		  alert('No hay stock suficiente para vender la cantidad solicitada, se modifico la cantidad automaticamente a '+producto.stock);
    }
	
    
      const subtotal = this.cantidadProducto * producto.precio;
      this.venta.productos.push({
        id:this.generateId(),
        producto: {codigo: producto.codigo, descripcion:producto.descripcion, stock:producto.stock, activo: producto.activo, precio: producto.precio },
        cantidad: this.cantidadProducto,
        subtotal: subtotal,
        precioUnitario: producto.precio,
      });
      this.venta.total+=subtotal;
      this.codigoProducto = '';
      this.cantidadProducto = 1;
      } 
      else{
		  alert('Producto sin stock');
	  }}
    } 
    
  },
  error => {
      alert('Producto no encontrado.');
    });
  
}
private generateId(): number {
  return Math.floor(Math.random() * 1000000); // Genera un ID único basado en un número aleatorio
}

// obtenerProducto(codigo: string, index: number): void {
// debugger
//   if(codigo==null ||codigo==''){
//     this.errorMessage = 'Formulario inválido';
//     return;
//   }

//   this.productoService.obtener_producto_by_codigo(codigo).subscribe(
//     producto => {
//       this.venta.productos[index].producto = producto;
//     },
//     error => {
//       this.errorMessage=error;
//       alert('Producto no encontrado');
//       this.venta.productos[index].producto = { codigo: '', descripcion: '', precio: 0, stock: 0 ,activo:true};
//     }
//   );
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

  this.errorMessage ='';
  //  this.venta.cliente = this.cliente;
  debugger
   this.venta.cliente = this.miFormulario.get('cliente')?.value;
  this.venta.fecha = new Date( this.miFormulario.get('Date')?.value);
  this.cliente=this.venta.cliente;
  if(this.venta.cliente==null ||this.venta.cliente==''){
    this.errorMessage = 'Formulario inválido- Nombre de cliente obligatorio';
    return;
  }


  if(this.venta.productos==null ||this.venta.productos.length==0){
    this.errorMessage = 'Formulario inválido- No se registran productos ingresados';
    console.log(this.errorMessage);
    return;
  }

 
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
 
      this.successMessage="Venta registrada exitosamente"
    },
    error => {
      this.errorMessage=error
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
