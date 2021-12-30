import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './modules/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './modules/recipe-form/recipe-form.component';
import { RecipesComponent } from './modules/recipes/recipes.component';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./modules/recipes/recipes.module').then((m) => m.RecipesModule),
  },
  { path: 'recipes/:recipeId', component: RecipeDetailsComponent },
  { path: 'recipes/edit/:recipeId', component: RecipeFormComponent },
  { path: 'create', component: RecipeFormComponent },
  { path: 'favorites', component: RecipesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
