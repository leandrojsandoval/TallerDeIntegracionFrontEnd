import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Venta,LineaDeVenta,Producto } from 'src/app/models';

// src/app/models/venta.ts


@Injectable({
  providedIn: 'root'
})
export class VentaService {

  apiUrl = environment.apiUrl;

  private ventas: Venta[] = [];
  private productos: Producto[] = [
    { codigo: 'P22', descripcion: 'Papas Francesas', precio: 1000, stock: 1000, activo:true },
    // Agrega más productos aquí
  ];

  constructor(private http: HttpClient) { }

  // getProductos(): Observable<Producto[]> {
  //   return of(this.productos);
  // }

  // getProductoPorCodigo(codigo: string): Observable<Producto> {
  //   const producto = this.productos.find(p => p.codigo === codigo);
  //   return producto ? of(producto) : throwError(() => new Error('Producto no encontrado'));
  // }

  registrarVenta(venta: Venta): Observable<Venta> {
    // Validar y registrar la venta
    venta.id = this.generateId();
    venta.fecha = new Date();
    //
    this.crear_objetoVenta(venta);
    //this.ventas.push(venta);
    this.actualizarStockProductosVenta(venta);
    //
    return of(venta);
  }

  private actualizarStock(venta: Venta): void {
    venta.productos.forEach(item => {
      const producto = this.productos.find(p => p.codigo === item.producto.codigo);
      if (producto) {
        producto.stock -= item.cantidad;
      }
    });
  }

  private generateId(): number {
    return Date.now() + Math.floor(Math.random() * 1000);
  }
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;

    if (error.status === 404) {
      errorMessage = 'La ruta no se encuentra.';
    } 
    else if (error.status === 0) {
      errorMessage = 'El servidor no está disponible.';
    }
    else if (error.status === 409) {
      errorMessage = 'El Venta(Codigo) ya existe.';
    } 
    else {
      errorMessage = 'Ocurrió un error inesperado.';
    }
    return throwError(errorMessage);
  }


  // getVentasByDateRange(startDate: string, endDate: string): Observable<Venta[]> {
  //   const start = new Date(startDate);
  //   const end = new Date(endDate);
  //   const filteredVentas = this.ventas.filter(venta => {
  //     const fechaVenta = new Date(venta.fecha);
  //     return fechaVenta >= start && fechaVenta <= end;
  //   });
  //   return of(filteredVentas);
  // }

  
  crear_objetoVenta(venta: Venta) {
    //   {
    //     "codigo": "Pasas",
    //     "descripcion": "Pasas Pasadas",
    //     "stock": 1110,
    //     "activo": false,
    //     "precio": 1100
    // }
      return this.http.post<any>(`${this.apiUrl}/ventas`, venta )
      .pipe(
        catchError(this.handleError)
      );;
    }
   
  actualizarStockProductosVenta(venta: Venta): void {
      venta.productos.forEach(item => {
        const producto = item.producto;
        producto.stock -= item.cantidad;
        this.actualizarStockOProducto(producto).subscribe(
          updatedProduct => {
            
            console.log('Producto actualizado:', updatedProduct);
          },
          error => {
            console.error('Error al actualizar el producto:', error);
          }
        );
      });

    }



actualizarStockOProducto(producto: Producto): Observable<Producto> {
      return this.http.post<Producto>(`${this.apiUrl}/productos/actualizarStock`, producto);
}

crearLineaDeVenta(lineaDeVenta: LineaDeVenta,ventaId:number): Observable<LineaDeVenta> {
  return this.http.post<LineaDeVenta>(`${this.apiUrl}/lineasdeventa/${ventaId}`, lineaDeVenta);
}

getVentasByDateRange(startDate: string, endDate: string): Observable<Venta[]> {
    let params = new HttpParams()
      .set('startDate', startDate)
      .set('endDate', endDate);
    
    return this.http.get<Venta[]>(`${this.apiUrl}/ventas/reportes`, { params });
  }


listarLineas_venta():Observable<LineaDeVenta[]>{
    return this.http.get<LineaDeVenta[]>(`${this.apiUrl}/lineasdeventa`);
  } 

  getLineaVentaPorIdVenta(ventaId: any):Observable<LineaDeVenta[]> {
  
    return this.http.get<LineaDeVenta[]>(`${this.apiUrl}/lineasdeventa/${ventaId}`);
} 
 

getVentaPorIdVenta(ventaId: any):Observable<Venta> {
  
  return this.http.get<Venta>(`${this.apiUrl}/ventas/${ventaId}`);

} 
}


