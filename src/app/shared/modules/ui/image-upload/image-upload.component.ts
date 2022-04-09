import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-image-upload",
    templateUrl: "./image-upload.component.html",
    styleUrls: ["./image-upload.component.scss"]
})
export class ImageUploadComponent implements OnInit {
    constructor() {}

    @Output() imageUpload = new EventEmitter();
    @Input() previewImage = "";
    @Input() isLoading = false;

    ngOnInit(): void {
        console.log("hi");
        this.previewImage = "../../../assets/images/placeholder.jpeg";
    }

    public upload(event: Event) {
        console.log(event);
        if ((event?.target as HTMLInputElement)?.files) {
            const x = (event?.target as HTMLInputElement).files;

            if (x) {
                this.imageUpload.emit(x[0]);
            }
        }
    }
}
