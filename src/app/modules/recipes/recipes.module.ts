import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "src/app/shared/modules/ui/button/button.module";
import { FilterModule } from "src/app/shared/modules/ui/filter/filter.module";
import { IconModule } from "src/app/shared/modules/ui/icon/icon.module";
import { ModalModule } from "src/app/shared/modules/ui/modal/modal.module";
import { SearchBarModule } from "src/app/shared/modules/ui/search-bar/search-bar.module";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";

@NgModule({
    declarations: [RecipesComponent],
    imports: [
        CommonModule,
        RecipesRoutingModule,
        ReactiveFormsModule,
        SearchBarModule,
        IconModule,
        FilterModule,
        ButtonModule,
        ModalModule
    ]
})
export class RecipesModule {}
