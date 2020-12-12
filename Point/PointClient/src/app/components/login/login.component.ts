import { CredentialsModel } from './../../models/credentials-model';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = new CredentialsModel();

  form: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(8)])),
    password: new FormControl('', Validators.required),
    // Validators.compose([Validators.required,
    //   Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" )])),
      //Minimum eight characters, at least one letter and one number:
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public async login(){
    const success = await this.authService.login(this.credentials);

    if(success){
      var notyf = new Notyf();
      notyf.success('Your have successfully login!');
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      },1500)
    }
  }

}
