import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
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

  constructor(private authService: AuthService) { }

  login() {
    this.authService.user(this.username, this.password)
      .subscribe(
        data => {
          // Manejar la respuesta exitosa aquí
          console.log(data);
          this.responseData = data;
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