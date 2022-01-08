import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  // public recipes$!: Observable<Recipe[]>;
  public form!: FormGroup;
  public recipes: Recipe[] = [];
  public recipeList: Recipe[] = [];
  public filteredList: Recipe[] = [];
  public showModal: boolean = false;
  public deleteItem: Recipe | undefined;
  public isFavoritesPage: boolean = false;
  public iterator!: number;
  public isFavorite: boolean = false;
  public showOptions: boolean = false;
  public searchInput!: string;
  public optionsItem!: Recipe | undefined;

  constructor(
    private recipeService: RecipesService,
    private fb: FormBuilder,
    private headerTitleService: HeaderTitleService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.isFavoritesPage = this.router.url === '/favorites';

    this.getRecipes();
    this.initFormGroup();

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

  public onDotsClicked(item: Recipe | undefined) {
    this.optionsItem = item;
    this.showOptions = !this.showOptions;
  }

  public showOptionsBox(item: Recipe) {
    return item === this.optionsItem;
  }

  public updateFavorites(recipe: Recipe) {
    console.log(recipe.uid);
    recipe.isFavorite = !recipe.isFavorite;
    this.recipeService.updateRecipe(recipe.uid, recipe);
  }

  public filteredItems() {
    return this.recipeList.filter((post: { title: string }) => {
      return post.title.toLowerCase().includes(this.searchInput.toLowerCase());
    });
  }

  public onSearchInputChange(inputValue: string) {
    console.log(inputValue);
    this.searchInput = inputValue;

    this.filteredList = this.recipeList.filter((post: { title: string }) => {
      return post.title.toLowerCase().includes(this.searchInput.toLowerCase());
    });
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
    this.showOptions = false;
  }

  public onModalDeleteClick(id: string | undefined) {
    this.recipeService.deleteRecipe(id);
    this.showModal = false;
    console.log(id);
  }

  public getFavoriteClasses(isFavorite: boolean): string {
    return isFavorite
      ? 'bg-yellow-500 border-yellow-500 text-black'
      : 'bg-[#fffbf7]';
  }

  getRecipes() {
    if (this.isFavoritesPage) {
      this.recipeService.getRecipes().subscribe((items) => {
        this.recipeList = items.filter((item) => item.isFavorite);
        this.filteredList = items.filter((item) => item.isFavorite);
        console.log(this.recipeList);
      });
    } else {
      this.recipeService.getRecipes().subscribe((items) => {
        this.recipeList = items;
        this.filteredList = items;
        console.log(this.recipeList);
      });
    }

    // this.recipes$ = this.recipeService.getRecipes();
  }
}
