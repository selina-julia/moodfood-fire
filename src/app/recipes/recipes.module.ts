import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RecipesComponent],
  imports: [CommonModule, RecipesRoutingModule, ReactiveFormsModule],
})
export class RecipesModule {}
