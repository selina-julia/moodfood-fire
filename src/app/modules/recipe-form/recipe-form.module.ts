import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "src/app/shared/modules/ui/modal/modal.module";
import { RecipeFormComponent } from "./recipe-form.component";
import { ButtonModule } from "src/app/shared/modules/ui/button/button.module";
import { ImageUploadModule } from "src/app/shared/modules/ui/image-upload/image-upload.module";

@NgModule({
    imports: [CommonModule, ModalModule, ButtonModule, ImageUploadModule]
})
export class RecipeFormModule {}
