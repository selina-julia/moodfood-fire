import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  public images!: string[];
  public currentImage!: string;
  public registerForm!: FormGroup;

  @Output() formData: EventEmitter<{
    email: string;
    password: string;
  }> = new EventEmitter();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const imgUrl = '../../../assets/images/';
    this.images = [
      imgUrl + 'login1.jpeg',
      imgUrl + 'login2.jpeg',
      imgUrl + 'login3.jpeg',
      imgUrl + 'login4.jpeg',
      imgUrl + 'login5.jpeg',
      imgUrl + 'login6.jpeg',
    ];
    this.initForm();

    this.setRandomBgImage();
  }

  public setRandomBgImage() {
    this.currentImage =
      this.images[Math.floor(Math.random() * this.images.length)];
    console.log(this.currentImage);
  }

  public initForm() {
    this.registerForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  public onCreateUserAccount() {
    console.log(this.registerForm);
    this.authService.signUp(
      this.registerForm.controls['email'].value,
      this.registerForm.controls['password'].value,
      this.registerForm.controls['firstName'].value,
      this.registerForm.controls['lastName'].value
    );

    //   this.authenticationService
    //     .login(this.registerForm.value)
    //     .catch((e) => console.log(e.message));
  }
}
