import { Component,NgModule } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})


export class ProductosComponent {

  Codigo: string = '';
  Descripcion: string = '';
  Stock: number = 0;
  Precio: number = 0;
  Activo: boolean = false;


  constructor(private productosService: ProductoService) { }


  Guarda() {

     const nuevoProducto = {
      codigo: this.Codigo,
      descripcion: this.Descripcion,
      stock: this.Stock,
      precio: this.Precio,
      activo: this.Activo
    };
    console.log("🚀 ~ ProductosComponent ~ Guarda ~ Codigo:", this.Codigo,this.Precio,this.Descripcion)
    this.productosService.crear_objetoProducto(
      nuevoProducto).subscribe(
      data => {
        // Manejar la respuesta exitosa aquí
        console.log(data);
        // this.responseData = data;
         // Redirigir a la página de inicio
        // this.dataService.setResponseData(this.responseData);
        // this.router.navigate(['/home']);
        console.log("🚀 ~ LoginComponent ~ login ~ responseData:",data)
      },
      error => {
        // Manejar el error aquí
        console.error(error);
        // this.errorMessage = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
      }
    );

  }
  
}
