import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

const routes: Routes = [
  {
    path: 'recipes',
    loadChildren: () =>
      import('./recipes/recipes.module').then((m) => m.RecipesModule),
  },
  { path: 'recipes/:recipeId', component: RecipeDetailsComponent },
  { path: 'recipes/edit/:recipeId', component: RecipeFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
