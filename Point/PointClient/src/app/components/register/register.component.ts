import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from 'src/app/models/user-model';
import { Router } from '@angular/router';
import { Notyf } from 'notyf';
import { PhoneModel } from 'src/app/models/phone-model';
import { LocationModel } from '../search-car/models/cars.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user: UserModel = new UserModel();
  public phone: PhoneModel ;
  public location: LocationModel = new LocationModel();

  public preview: string;

  form: FormGroup = new FormGroup({
    fullName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(15)])),
    userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(8)])),
    password: new FormControl('', Validators.required),
    // Validators.compose([Validators.required,
    //   Validators.pattern("^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" )])),
    //Minimum eight characters, at least one letter and one number:
    birthDate: new FormControl('',),
    gender: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    image: new FormControl(''),
    phone: new FormControl('', Validators.required),
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user.userRole = "3";
    navigator.geolocation.getCurrentPosition(position => {
      this.location.latitude = position.coords.latitude;
      this.location.longitude = position.coords.longitude;
    }, () => {
      this.location.latitude = 0;
      this.location.longitude = 0;
    });

    this.phone = new PhoneModel(this.location);
  }

  async onSubmit() {
    this.user.phone = this.phone;
    //this.user.phone.phoneID = null;
    console.log('user', this.user);
    const success = await this.authService.register(this.user);
    console.log(this.form);
    var notyf = new Notyf();

    if (success) {
      notyf.success('Your have successfully register!');
      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 2000)
    }
    else{
      notyf.error('Your have not registered!');
    }

  }

  public displayPreview(image: File) {
    this.user.image = image;
    const fileReader = new FileReader();
    fileReader.onload = args => this.preview = args.target.result.toString();
    fileReader.readAsDataURL(image);
  }
}
