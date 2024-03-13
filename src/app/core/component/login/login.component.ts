import { LoginService } from './../../service/login.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.fb.nonNullable.group({
    email: '',
    password: '',
  })

  constructor(
    private fb:FormBuilder,
    private LoginService: LoginService,
    private toastr: ToastrService,
    private router: Router,
    ) { }
  
  submit(){
    let email = this.loginForm.get('email')!.value;
    let password = this.loginForm.get('password')!.value;
    //email = this.loginForm.value.email!; bu da kullanılabilirdi...

    this.LoginService.login(email, password).subscribe({
      next: (value) => {
        // login başarılı cevabı döndü 
        this.toastr.success('Logged in');
        this.router.navigateByUrl('/menu');
      },
      error: (err) => {
        this.toastr.error('Error occured');
        // formun tüm alanlarının değerleri değiştirilmek isteniyorsa setValue fonksyionu kullanılır.
        // tüm alanların değerleri değiştirilmeyecekse patchValue fonksiyonu kullanılır.
        this.loginForm.patchValue({password: ''});
        console.error(err);
      }
    });
  }
  signup(){
    let email = this.loginForm.get('email')!.value;
    let password = this.loginForm.get('password')!.value;
    //email = this.loginForm.value.email!; bu da kullanılabilirdi...

    this.LoginService.signup(email, password).subscribe({
      next: (value) => {
        // login başarılı cevabı döndü 
        this.toastr.success('Sign Up and Login Successful');
        this.router.navigateByUrl('/menu');
      },
      error: (err) => {
        this.toastr.error('Error occured');
        // formun tüm alanlarının değerleri değiştirilmek isteniyorsa setValue fonksyionu kullanılır.
        // tüm alanların değerleri değiştirilmeyecekse patchValue fonksiyonu kullanılır.
        this.loginForm.patchValue({password: ''});
        console.error(err);
      }
    });
  }
}
