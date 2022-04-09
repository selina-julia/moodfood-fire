import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageUploadComponent } from "./image-upload.component";
import { ButtonModule } from "../button/button.module";

@NgModule({
    imports: [CommonModule, ButtonModule],
    declarations: [ImageUploadComponent],
    exports: [ImageUploadComponent]
})
export class ImageUploadModule {}
