import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  showButtons: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      // Check if the current route is '/dashboard'
      this.showButtons = this.router.url === '/dashboard';
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        // Redirect to login page after successful logout
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
    console.log('Logging out');
  }
}
