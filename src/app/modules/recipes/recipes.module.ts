import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from 'src/app/shared/modules/ui/button/button.component';
import { FilterModule } from 'src/app/shared/modules/ui/filter/filter.module';
import { IconComponent } from 'src/app/shared/modules/ui/icon/icon.component';
import { IconModule } from 'src/app/shared/modules/ui/icon/icon.module';
import { ModalComponent } from 'src/app/shared/modules/ui/modal/modal.component';
import { SearchBarComponent } from 'src/app/shared/modules/ui/search-bar/search-bar.component';
import { SearchBarModule } from 'src/app/shared/modules/ui/search-bar/search-bar.module';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';

@NgModule({
  declarations: [RecipesComponent, ModalComponent],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    ReactiveFormsModule,
    SearchBarModule,
    IconModule,
    FilterModule,
  ],
})
export class RecipesModule {}
