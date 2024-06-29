import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of  } from 'rxjs';
import { Producto, Venta, LineaDeVenta } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  private responseDataSubject = new BehaviorSubject<any>(null);
  responseData$ = this.responseDataSubject.asObservable();
  
  setResponseData(data: any) {
    this.responseDataSubject.next(data);
  }

  private productos: Producto[] = [
    { codigo: 'B01', descripcion: 'Coca Cola 1,75L', stock: 1000, activo: true, precio: 2500 },
    { codigo: 'B02', descripcion: 'Sprite común 1,75L', stock: 1000, activo: true, precio: 1500.25 },
    { codigo: 'B03', descripcion: 'Fanta 2L', stock: 1000, activo: true, precio: 1750.5 },
    { codigo: 'B04', descripcion: 'Cunnington Lima Limon', stock: 1000, activo: true, precio: 1250 },
    { codigo: 'A01', descripcion: 'Galletitas Terrabusi Variedad Roja', stock: 1000, activo: true, precio: 950 },
    { codigo: 'A02', descripcion: 'Galletitas Terrabusi Variedad Dorada', stock: 1000, activo: true, precio: 950 },
    { codigo: 'A03', descripcion: 'Palitos Krachitos', stock: 1000, activo: true, precio: 1000 },
    { codigo: 'A04', descripcion: 'Papas fritas Krachitos', stock: 1000, activo: true, precio: 2500 },
    { codigo: 'L01', descripcion: 'Cif Crema', stock: 1000, activo: true, precio: 2600 },
    { codigo: 'L02', descripcion: 'Mr Musculo Antigrasa', stock: 1000, activo: true, precio: 2550 },
    { codigo: 'L03', descripcion: 'Jabon Neutro Seiseme', stock: 1000, activo: true, precio: 1550 },
    { codigo: 'L04', descripcion: 'Lavandina Ayudin', stock: 1000, activo: true, precio: 2000 },
    { codigo: 'P01', descripcion: 'Shampoo Dove', stock: 1000, activo: true, precio: 4000 },
    { codigo: 'P02', descripcion: 'Jabon Liquido Lux', stock: 1000, activo: true, precio: 5000 },
    { codigo: 'P03', descripcion: 'Desodorante Axe', stock: 1000, activo: true, precio: 4500 },
    { codigo: 'P04', descripcion: 'Desodorante Dove Original', stock: 1000, activo: true, precio: 4400 }
  ];

  private ventas: Venta[] = [];

  private currentVentaId = 1;
  constructor() { }



  getProductos(): Observable<Producto[]> {
    return of(this.productos);
  }

  getProductoPorCodigo(codigo: string): Observable<Producto | undefined> {
    const producto = this.productos.find(p => p.codigo === codigo);
    return of(producto);
  }

  registrarVenta(venta: Venta): Observable<Venta> {
    venta.id = this.currentVentaId++;
    this.ventas.push(venta);
    // Actualizar stock de productos
    venta.productos.forEach(linea => {
      const producto = this.productos.find(p => p.codigo === linea.producto.codigo);
      if (producto) {
        producto.stock -= linea.cantidad;
      }
    });
    return of(venta);
  }

  getVentas(): Observable<Venta[]> {
    return of(this.ventas);
  }
}
