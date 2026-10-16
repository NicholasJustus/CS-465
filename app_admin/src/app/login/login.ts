
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="login-container">
      <h1>Admin Login</h1>

      <form (ngSubmit)="login()">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          [(ngModel)]="email"
          required
        />

        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          [(ngModel)]="password"
          required
        />

        <button type="submit">Log In</button>

        @if (errorMessage) {
          <p class="error">{{ errorMessage }}</p>
        }
      </form>
    </section>
  `,
  styles: [`
    .login-container {
      max-width: 420px;
      margin: 40px auto;
      padding: 24px;
      background: white;
      border-radius: 8px;
    }

    label, input {
      display: block;
      width: 100%;
      box-sizing: border-box;
      margin-bottom: 12px;
    }

    input {
      padding: 10px;
    }

    button {
      padding: 10px 18px;
      cursor: pointer;
    }

    .error {
      color: #b42318;
    }
  `]
})
export class Login {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) {}

  login(): void {
    this.errorMessage = '';

    this.auth.login({
  _id: '',
  name: '',
  email: this.email,
  password: this.password
})
    .subscribe({
      next: () => this.router.navigate(['/trips']),
      error: () => {
        this.errorMessage = 'Login failed. Check your email and password.';
      }
    });
  }
}
