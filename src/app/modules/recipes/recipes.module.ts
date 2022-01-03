import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from 'src/app/shared/modules/ui/button/button.component';
import { IconComponent } from 'src/app/shared/modules/ui/icon/icon.component';
import { IconModule } from 'src/app/shared/modules/ui/icon/icon.module';
import { ModalComponent } from 'src/app/shared/modules/ui/modal/modal.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [RecipesComponent, ModalComponent, ButtonComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    IconModule,
  ],
})
export class RecipesModule {}
