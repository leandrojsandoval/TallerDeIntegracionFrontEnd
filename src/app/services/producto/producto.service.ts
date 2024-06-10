import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  apiUrl = environment.apiUrl;
 

  constructor(private http: HttpClient) { }

  crear( Codigo:string,Descripcion:string,Precio:number,Stock:Number,Activo:boolean) {
    return this.http.post<any>(`${this.apiUrl}/productos`, { Codigo,Descripcion,Precio,Stock,Activo });
  }

  crear_objetoProducto(producto:any) {
  //   {
  //     "codigo": "Pasas",
  //     "descripcion": "Pasas Pasadas",
  //     "stock": 1110,
  //     "activo": false,
  //     "precio": 1100
  // }
    return this.http.post<any>(`${this.apiUrl}/productos`, producto )
    .pipe(
      catchError(this.handleError)
    );;
  }
 
 
  listar_productos( ) {
    return this.http.get<any>(`${this.apiUrl}/productos`);
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
      errorMessage = 'El Producto(Codigo) ya existe.';
    } 
    else {
      errorMessage = 'Ocurrió un error inesperado.';
    }
    return throwError(errorMessage);
  }
}
