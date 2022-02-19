import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of } from 'rxjs';

import { Recipe } from '../recipes/shared/recipe';
import { RecipesService } from '../../shared/services/recipes/recipes.service';
import { HeaderTitleService } from 'src/app/shared/services/headerTitle/headerTitle.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from 'src/app/shared/models/category';
import { CategoriesService } from 'src/app/shared/services/categories/categories.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  public recipe: Recipe | undefined;
  public category?: Category;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipesService,
    private categoriesService: CategoriesService,
    private headerTitleService: HeaderTitleService,
    private afs: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.headerTitleService.setTitle('');

    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('recipeId');

    this.recipeService.getRecipes().subscribe((items) => {
      this.recipe = items.find((item) => {
        return item.uid === productIdFromRoute;
      });
    });

    this.categoriesService.getRecipes().subscribe((cats) => {
      if (!this.recipe?.categories) {
        return;
      }

      this.category = cats.find((cat) => {
        return cat.uid === this.recipe?.categories?.id;
      });

    });

    // this.recipeService.getRecipeById(params['id']).subscribe(res => (this.recipe = res));
  }

  public getAuthor$(
    item: Recipe | undefined
  ): Observable<Category | undefined> {
    if (!item?.categories?.id) {
      return of(undefined);
    }

    return this.recipeService.category$(item?.categories.id);
  }
}
