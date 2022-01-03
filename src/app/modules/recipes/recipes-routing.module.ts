import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconModule } from 'src/app/shared/modules/ui/icon/icon.module';
import { RecipesComponent } from './recipes.component';

const routes: Routes = [{ path: '', component: RecipesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes), IconModule],
  exports: [RouterModule],
})
export class RecipesRoutingModule {}
