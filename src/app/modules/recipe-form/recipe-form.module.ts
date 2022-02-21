import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from 'src/app/shared/modules/ui/modal/modal.module';
import { RecipeFormComponent } from './recipe-form.component';



@NgModule({
  declarations: [RecipeFormComponent],
  imports: [
    CommonModule, ModalModule
  ]
})
export class RecipeFormModule { }
