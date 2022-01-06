import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
})
export class AuthFormComponent implements OnInit {
  public images!: string[];
  public currentImage!: string;

  constructor() {}

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

    console.log(this.images);

    this.setRandomBgImage();
  }

  public setRandomBgImage() {
    this.currentImage =
      this.images[Math.floor(Math.random() * this.images.length)];
    console.log(this.currentImage);
  }
}
