import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { VentasComponent } from './components/ventas/ventas.component';
import { ProductosComponent } from './components/productos/productos.component';
import { BuscarVentasComponent } from './components/buscar-ventas/buscar-ventas.component';
import { RegistrarVentasComponent } from './components/registrar-ventas/registrar-ventas.component';
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { FilterNoStockPipe } from './pipes/filter-no-stock.pipe';
import { FilterStockPipe } from './pipes/filter-stock.pipe';
import { SearchPipe } from 'src/app/pipes/search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavBarComponent,
    VentasComponent,
    ProductosComponent,
    BuscarVentasComponent,
    RegistrarVentasComponent,
    ListarProductosComponent,
    NotificacionComponent,
    FilterNoStockPipe,
    FilterStockPipe,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,    
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
