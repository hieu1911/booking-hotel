import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  noError: boolean = true;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
 
  }

  ngOnInit(): void {
   this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  submit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.userService.login(this.loginForm.value.email.trim(), this.loginForm.value.password.trim()).subscribe({
      next: (user: any) => {
        this.router.navigateByUrl('/home');
        this.noError = true;
      },
      error: (err: any) => {
        this.noError = false;
      }
    })
  }
}
