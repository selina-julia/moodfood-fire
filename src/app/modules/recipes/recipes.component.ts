import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
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
  public userId?: string;
  public user?: User;
  public recipes$ = new BehaviorSubject<Recipe[] | undefined>(undefined);
  public isLoading: boolean = false;

  constructor(
    private recipeService: RecipesService,
    private fb: FormBuilder,
    private headerTitleService: HeaderTitleService,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit() {
    this.isFavoritesPage = this.router.url === '/favorites';
    this.isLoading = true;

    setTimeout(() => {
      this.refreshCurrentUser();
      this.getRecipes();
      this.initFormGroup();
      this.isLoading = false;
    }, 1000);

    this.headerTitleService.setTitle(
      this.isFavoritesPage ? 'Favoriten' : 'Dashboard'
    );
  }

  public async refreshCurrentUser(): Promise<void> {
    this.authService.fetchUser();

    this.authService.user$.subscribe((val) => {
      console.log(val);
      if (val) {
        this.userId = val.uid;
        this.user = val;
      }
    });
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
      ? 'bg-[#f6cc63] border-[#f6cc63] text-black'
      : 'bg-[#fffbf7]';
  }

  getRecipes() {
    if (!this.userId) {
      return;
    }
    if (this.isFavoritesPage) {
      this.recipeService.getRecipes().subscribe((items) => {
        this.recipes$.next(items);

        this.recipes$.subscribe((val) => console.log(val));

        this.recipeList = items.filter(
          (item) => item.isFavorite && item.userId === this.userId
        );
        this.filteredList = items.filter(
          (item) => item.isFavorite && item.userId === this.userId
        );
        console.log(this.recipeList);
      });
    } else {
      this.recipeService.getRecipes().subscribe((items) => {
        this.recipeList = items.filter((item) => item.userId === this.userId);
        this.filteredList = items.filter((item) => item.userId === this.userId);
        console.log(this.recipeList);
      });
    }

    // this.recipes$ = this.recipeService.getRecipes();
  }
}
