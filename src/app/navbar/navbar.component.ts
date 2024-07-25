import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed = true;

  username!:string|null;
  ngOnInit(): void {
    this.username= localStorage.getItem('name')
  }

  constructor(
    private router: Router
  ){}

  logout(): void {
    // Clear local storage
    localStorage.removeItem('auth');
    localStorage.removeItem('name');
    this.username=""
    this.router.navigate(['/auth'])

    // Optionally navigate to login page or home page
  }
}
