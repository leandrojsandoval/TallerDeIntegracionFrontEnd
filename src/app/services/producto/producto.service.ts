import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Producto } from 'src/app/models';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';


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

  obtener_producto_by_codigo(codigo:string) {

    return this.http.get<Producto>(`${this.apiUrl}/productos/${codigo}`)
    .pipe(
      catchError(this.handleError)
    );;
  }

tabla_productos_a_string(data: any[],cabecera:string): string {
	
    return cabecera+data.map(row => Object.values(row).join(',')).join('\n');
  }
exportar_a_xlsx(data: any[], fileName: string, nombreHoja: string): void {
    // Convertir los datos a una hoja de cálculo
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'Productos': worksheet }, SheetNames: ['Productos'] };
    
    // Generar el archivo Excel
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Guardar el archivo
    this.guardar_archivo_excel(excelBuffer, fileName);
    }

private guardar_archivo_excel(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(data);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.xlsx`;
    document.body.appendChild(a);
    a.click();
    
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
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

  desactivaProducto(id: string){
    return this.http.delete<Producto>(`${this.apiUrl}/productos/${id}}`)
  }
  actualizarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/productos/actualizarProducto`, producto);}
}
