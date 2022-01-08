import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Recipe } from '../recipes/shared/recipe';
import { RecipesService } from '../../shared/services/recipes/recipes.service';
import { HeaderTitleService } from 'src/app/shared/services/headerTitle/headerTitle.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  public recipe: Recipe | undefined;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private headerTitleService: HeaderTitleService,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.headerTitleService.setTitle('');

    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('recipeId');
    console.log(productIdFromRoute);

    this.recipeService.getRecipes().subscribe((items) => {
      this.recipe = items.find((item) => {
        return item.uid === productIdFromRoute;
      });
      console.log(this.recipe);
    });

    // this.recipeService.getRecipeById(params['id']).subscribe(res => (this.recipe = res));
  }
}
