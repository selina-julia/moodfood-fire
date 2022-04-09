import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth/auth.service";

@Component({
    selector: "app-auth-form",
    templateUrl: "./auth-form.component.html",
    styleUrls: ["./auth-form.component.scss"]
})
export class AuthFormComponent implements OnInit {
    public images!: string[];
    public currentImage!: string;
    public loginForm!: FormGroup;

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.initForm();

        const imgUrl = "../../../assets/images/";
        this.images = [
            imgUrl + "login1.jpeg",
            imgUrl + "login2.jpeg",
            imgUrl + "login3.jpeg",
            imgUrl + "login4.jpeg",
            imgUrl + "login5.jpeg",
            imgUrl + "login6.jpeg"
        ];

        this.setRandomBgImage();
    }

    public initForm() {
        this.loginForm = new FormGroup({
            email: new FormControl("", Validators.required),
            password: new FormControl("", Validators.required)
        });
    }

    public setRandomBgImage() {
        this.currentImage =
            this.images[Math.floor(Math.random() * this.images.length)];
    }

    public onLogin() {
        this.authService.login(
            this.loginForm.controls["email"].value,
            this.loginForm.controls["password"].value
        );
    }
}
