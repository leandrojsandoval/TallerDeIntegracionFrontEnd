import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../services/data/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  responseData: any;

  constructor(private authService: AuthService,private router:Router,private dataService: DataService) { }

  login() {
    this.authService.user(this.username, this.password)
      .subscribe(
        data => {
          // Manejar la respuesta exitosa aquí
          console.log(data);
          this.responseData = data;
           // Redirigir a la página de inicio
          this.dataService.setResponseData(this.responseData);
          this.router.navigate(['/home']);
          console.log("🚀 ~ LoginComponent ~ login ~ responseData:", this.responseData)
        },
        error => {
          // Manejar el error aquí
          console.error(error);
          this.errorMessage = 'Error al iniciar sesión. Por favor, verifica tus credenciales.';
        }
      );
  }
}