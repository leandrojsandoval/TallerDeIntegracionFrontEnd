import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
    return this.http.post<any>(`${this.apiUrl}/productos`, producto );
  }
 
 
  listar_productos( ) {
    return this.http.get<any>(`${this.apiUrl}/productos`);
  }
}
