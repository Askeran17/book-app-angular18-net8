import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit() {
    console.log('HeaderComponent initialized');
    console.log('AuthService isAuthenticated:', this.authService.isAuthenticated());
  }

  logout() {
    this.authService.logout();
  }
}
