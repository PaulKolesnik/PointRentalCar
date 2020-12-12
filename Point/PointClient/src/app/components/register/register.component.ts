import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user-model';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user: UserModel = new UserModel();

  public preview: string;

  form: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])),
    userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(8)])),
    password: new FormControl('', Validators.required),
    // Validators.compose([Validators.required,
    //   Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" )])),
      //Minimum eight characters, at least one letter and one number:
    birthDate: new FormControl('', ),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    image: new FormControl(''),
    phone: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router
    ){  }

  ngOnInit(): void {
  }

  async onSubmit(){
    console.log('user',this.user);
    this.user.userRole = "3";
    this.user.phoneID = 2;
    const success = await this.authService.register(this.user);

    if(success){
      var notyf = new Notyf();
      notyf.success('Your have successfully register!');
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      },2000)
    }

  }

  public displayPreview(image: File) {
    //this.newCarToFleet.carImg = image;
    const fileReader = new FileReader();
    fileReader.onload = args => this.preview = args.target.result.toString();
    fileReader.readAsDataURL(image);
  }
}
