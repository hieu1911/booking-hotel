import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  private regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  noErrorEmail: boolean = true;
  noErrorPass1: boolean = true;
  noErrorPass2: boolean = true;

  password: string = '';
  passwordConfirm: string = '';

  state: string = 'email';
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
      phoneNumber: ['']
    })
  }

  enterPassword(event: any): void {
    this.handleKeyEnter(event);

    if (!this.regexEmail.test(this.registerForm.value.email)) {
      this.noErrorEmail = false;
      return;
    }
    this.noErrorEmail = true;

    this.state = 'password';
  }

  enterInfo(event: any): void {
    this.handleKeyEnter(event);

    if (!this.regexPassword.test(this.registerForm.value.password)) {
      this.noErrorPass1 = false;
      return;
    }

    if (this.registerForm.value.password !== this.registerForm.value.passwordConfirm) {
      this.noErrorPass2 = false;
      return;
    }

    this.noErrorPass1 = true;
    this.noErrorPass2 = true;

    this.state = 'info';
  }

  handleKeyEnter(event: any) {
    event.preventDefault();
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }
    
    this.userService.register(
      this.registerForm.value.username.trim() || 'user',
      this.registerForm.value.email.trim(),
      this.registerForm.value.password.trim(),
      this.registerForm.value.phoneNumber.trim() || '',
    ).subscribe({
      next: (user: any) => {
        this.router.navigateByUrl('/login');
      },
      error: (err: any) => {

      }
    })
  }

}
