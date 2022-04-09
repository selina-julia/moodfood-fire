import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ModalModule } from "src/app/shared/modules/ui/modal/modal.module";
import { RecipeFormComponent } from "./recipe-form.component";
import { ButtonModule } from "src/app/shared/modules/ui/button/button.module";

@NgModule({
    imports: [CommonModule, ModalModule, ButtonModule]
})
export class RecipeFormModule {}
