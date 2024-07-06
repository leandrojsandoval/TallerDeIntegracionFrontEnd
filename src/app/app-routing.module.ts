import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BuscarVentasComponent } from './components/buscar-ventas/buscar-ventas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { RegistrarVentasComponent } from './components/registrar-ventas/registrar-ventas.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { DetalleVentaComponent } from './components/detalle-venta/detalle-venta.component';
import { EditarProductoComponent } from './components/editar-producto/editar-producto.component';

const routes: Routes = [

  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto redirige al login
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'Buscar_Ventas', component: BuscarVentasComponent },
  { path: 'Registrar_Productos', component: ProductosComponent },
  { path: 'Listar_productos', component: ListarProductosComponent },
  { path: 'Registrar_Ventas', component:RegistrarVentasComponent },
  { path: 'Recaudacion_por_producto', component: VentasComponent},
  { path: 'Detalle_Venta/:id', component: DetalleVentaComponent},
  { path: 'Editarproducto/:id', component: EditarProductoComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
