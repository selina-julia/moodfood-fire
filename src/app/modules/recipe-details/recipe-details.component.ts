import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { Recipe } from '../recipes/shared/recipe';
import { RecipesService } from '../../shared/services/recipes/recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  public recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService
  ) {}

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('recipeId');

    this.recipeService.getRecipes().subscribe((items) => {
      this.recipe = items.find((item) => item.id === productIdFromRoute);
      console.log(this.recipe);
    });

    // this.recipeService.getRecipeById(params['id']).subscribe(res => (this.recipe = res));
  }
}
