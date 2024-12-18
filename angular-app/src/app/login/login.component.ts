import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service'; // Import AuthService

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isDarkMode = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const credentials = { username: this.username, password: this.password };
    this.authService.login(credentials).subscribe(() => {
      this.router.navigate(['/book-list']);
    }, error => {
      alert('Invalid credentials');
      console.error('Login failed', error);
    });
  }

}
