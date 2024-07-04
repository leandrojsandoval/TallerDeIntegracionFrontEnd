import { Component,  OnInit } from '@angular/core';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  responseData: any;

  constructor(private productosService: ProductoService,private router: Router
  ) {
  
   }

  ngOnInit(): void {
    this.productosService.listar_productos ().subscribe(data => {
      this.responseData = data;
      console.log("🚀 ~ ListarProductosComponent ~ this.productosService.listar_productos ~ responseData:",  this.responseData)
    });

  
  } 
     agregarProducto():void
     {
		this.router.navigate(['/Registrar_Productos']);
     }
     modificarProducto():void{

     };
     eliminarProducto() : void{

     }
     exportarListaProductos(): void{
		const fileContent = this.productosService.tabla_productos_a_string(this.responseData, "Código,Descripción,Stock,Activo,Precio\n");
	    const blob = new Blob([fileContent], { type: 'text/plain' });
	    const url = window.URL.createObjectURL(blob);
	
	    const a = document.createElement('a');
	    a.href = url;
	    a.download = 'lista-productos.txt';
	    document.body.appendChild(a);
	    a.click();
	
	    document.body.removeChild(a);
	    window.URL.revokeObjectURL(url);

     };   
     exportarListaProductosXLS(): void{
		this.productosService.exportar_a_xlsx(this.responseData, 'lista-productos','Productos');
     }; 

 
}
