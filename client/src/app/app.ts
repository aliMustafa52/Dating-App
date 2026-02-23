import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../layout/nav/nav";
import { Home } from '../features/home/home';
import { AccountService } from '../core/services/account-service';
import { Login } from '../features/account/login/login';

@Component({
  selector: 'app-root',
  imports: [Nav, Home, Login],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal("Hello World! I'm Ali");
  protected members = signal<any>([]);

  public accountService = inject(AccountService);
  private http = inject(HttpClient);

  ngOnInit(): void {
    this.http.get('https://localhost:5001/api/members').subscribe({
      next: (response) => this.members.set(response),
      error: (error) => console.log(error),
      complete: () => console.log('Request completed')
    });
  }
}