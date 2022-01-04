import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HeaderTitleService } from 'src/app/shared/services/headerTitle/headerTitle.service';
import { RecipesService } from 'src/app/shared/services/recipes/recipes.service';
import { Recipe } from './shared/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  public recipes$!: Observable<Recipe[]>;
  public form!: FormGroup;
  public recipes: Recipe[] = [];
  public showModal: boolean = false;
  public deleteItem: Recipe | undefined;
  public isFavoritesPage: boolean = false;
  public iterator!: number;

  constructor(
    private recipeService: RecipesService,
    private fb: FormBuilder,
    private headerTitleService: HeaderTitleService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getRecipes();
    this.initFormGroup();

    this.isFavoritesPage = this.router.url === '/favorites';

    this.headerTitleService.setTitle(
      this.isFavoritesPage ? 'Favoriten' : 'Dashboard'
    );
  }

  public initFormGroup() {
    this.form = this.fb.group({
      title: '',
    });
  }

  public getRecipeLevel(level: string) {
    switch (level) {
      case 'easy':
        return new Array(1);

      case 'medium':
        return new Array(2);

      case 'advanced':
        return new Array(3);

      default:
        return null;
    }
  }

  public onSearchInputChange(inputValue: string) {
    console.log(inputValue);

    // return this.posts.filter((post: { title: string }) => {
    //   return post.title.toLowerCase().includes(this.search.toLowerCase())
    // })
  }

  public createRecipe() {
    this.recipeService.createRecipe(this.form.value).then();
  }

  public deleteRecipe(id: Recipe) {
    this.showModal = true;
    this.deleteItem = id;
  }

  public onCancelClick() {
    this.showModal = false;
  }

  public onModalDeleteClick(id: string | undefined) {
    this.recipeService.deleteRecipe(id);
    this.showModal = false;
    console.log(id);
  }

  getRecipes() {
    this.recipes$ = this.recipeService.getRecipes();
  }
}
