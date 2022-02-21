import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Form, FormControl, FormGroup } from "@angular/forms";
import { User } from "src/app/shared/models/user";

@Component({
    selector: "app-user-settings-form",
    templateUrl: "./user-settings-form.component.html",
    styleUrls: ["./user-settings-form.component.scss"]
})
export class UserSettingsFormComponent implements OnInit {
    @Input() user?: User;
    @Output() cancel = new EventEmitter();

    public userSettingsForm!: FormGroup;

    constructor() {}

    ngOnInit(): void {
        this.initForm();
        console.log(this.user);
    }

    public onCancel() {
        this.cancel.emit("cancel");
    }

    public getInitialLetter() {
        if (!this.user?.firstName) return;
        return this.user?.firstName?.charAt(0).toUpperCase();
    }

    private initForm() {
        this.userSettingsForm = new FormGroup({
            firstName: new FormControl(this.user?.firstName || ""),
            lastName: new FormControl(this.user?.lastName || ""),
            email: new FormControl(this.user?.email || ""),
            phone: new FormControl("")
            // birthday: new FormControl(''),
            // gender: new FormControl(''),
        });
    }
}
