import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from 'src/app/shared/modules/ui/modal/modal.component';
import { ButtonComponent } from 'src/app/shared/modules/ui/button/button.component';

@NgModule({
  declarations: [RecipesComponent, ModalComponent, ButtonComponent],
  imports: [CommonModule, RecipesRoutingModule, ReactiveFormsModule],
})
export class RecipesModule {}
