import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { User } from "src/app/shared/models/user";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { HeaderTitleService } from "src/app/shared/services/headerTitle/headerTitle.service";
import { RecipesService } from "src/app/shared/services/recipes/recipes.service";
import { Recipe } from "./shared/recipe";

@Component({
    selector: "app-recipes",
    templateUrl: "./recipes.component.html",
    styleUrls: ["./recipes.component.scss"]
})
export class RecipesComponent implements OnInit {
    // public recipes$!: Observable<Recipe[]>;
    public form!: FormGroup;
    public recipes: Recipe[] = [];
    public recipeList: Recipe[] = [];
    public filteredList: Recipe[] = [];
    public showModal: boolean = false;
    public deleteItem!: Recipe;
    public isFavoritesPage: boolean = false;
    public isDashboardPage: boolean = false;
    public iterator!: number;
    public isFavorite: boolean = false;
    public showOptions: boolean = false;
    public searchInput!: string;
    public optionsItem!: Recipe | undefined;
    public userId?: string;
    public user?: User;
    public recipes$ = new BehaviorSubject<Recipe[] | undefined>(undefined);
    public isLoading: boolean = false;
    public showStatusModal = false;
    public statusItem!: Recipe;

    constructor(
        private recipeService: RecipesService,
        private fb: FormBuilder,
        private headerTitleService: HeaderTitleService,
        private router: Router,
        private authService: AuthService
    ) {}

    ngOnInit(): void {
        this.isFavoritesPage = this.router.url === "/favorites";
        this.isDashboardPage = this.router.url === "/recipes";

        this.refreshCurrentUser();
        this.initFormGroup();

        this.headerTitleService.setTitle(
            this.isFavoritesPage ? "Favoriten" : "Meine Rezepte"
        );

        if (this.isDashboardPage) {
            this.headerTitleService.setTitle("Dashboard");
        }
    }

    public refreshCurrentUser(): void {
        this.authService.user$.subscribe((val) => {
            if (val) {
                console.log(val);
                this.userId = val.uid;
                this.user = val;
                this.getRecipes();
            }
        });
    }

    public initFormGroup() {
        this.form = this.fb.group({
            title: ""
        });
    }

    public getRecipeLevel(level: string) {
        switch (level) {
            case "easy":
                return new Array(1);

            case "medium":
                return new Array(2);

            case "advanced":
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

    // public updateFavorites(recipe: Recipe) {
    //   recipe.isFavorite = !recipe.isFavorite;
    //   this.recipeService.updateRecipe(recipe.uid, recipe);
    // }

    public changePublicState(recipe: Recipe) {
        switch (recipe.publicState) {
            case "public":
                recipe.publicState = "private";
                break;
            case "private":
                recipe.publicState = "public";
                break;
        }

        this.recipeService.updateRecipe(recipe.uid, recipe);
        this.showStatusModal = false;
    }

    public getStatusModelData(statusItem: Recipe) {
        const status =
            statusItem.publicState === "private" ? "privat" : "öffentlich";
        return {
            headline: "Status ändern",
            description: `Das Rezept '${statusItem.title}' ist aktuell ${status}. Möchtest du den Veröffentlichungsstatus ändern?`,
            actionButton:
                statusItem.publicState === "private"
                    ? "Rezept veröffentlichen"
                    : "Rezept verstecken",
            cancelButton: "Abbrechen"
        };
    }

    public getDeleteRecipeModalData(item: Recipe) {
        return {
            headline: "Rezept löschen",
            description: `Bist du sicher, dass du das Rezept '${item.title}' löschen möchtest?`,
            actionButton: "Löschen",
            cancelButton: "Abbrechen"
        };
    }

    public getFavoriteState(recipe: Recipe) {
        if (!this.user?.favoriteRecipes) {
            return false;
        }
        return this.user?.favoriteRecipes.indexOf(recipe.uid as string) >= 0;
    }

    public updateFavorites(recipe: Recipe) {
        const favorites = this.user?.favoriteRecipes;
        if (!favorites) {
            return;
        }

        const position = favorites.indexOf(recipe.uid as string);

        if (position === undefined) {
            return;
        }

        if (position >= 0) {
            favorites.splice(position, 1);
        } else {
            this.user?.favoriteRecipes?.push(recipe?.uid as string);
        }

        this.authService.updateUserRecipes(this.user?.uid, this.user as User);
        this.isFavorite = !this.isFavorite;
    }

    public filteredItems() {
        return this.recipeList.filter((post: { title: string }) => {
            return post.title
                .toLowerCase()
                .includes(this.searchInput.toLowerCase());
        });
    }

    public onSearchInputChange(inputValue: string) {
        this.searchInput = inputValue;

        this.filteredList = this.recipeList.filter(
            (post: { title: string }) => {
                return post.title
                    .toLowerCase()
                    .includes(this.searchInput.toLowerCase());
            }
        );
    }

    public createRecipe() {
        this.recipeService.createRecipe(this.form.value).then();
    }

    public deleteRecipe(id: Recipe) {
        this.showModal = true;
        this.deleteItem = id;
    }

    public onChangePublicState(recipe: Recipe) {
        this.showStatusModal = true;
        this.statusItem = recipe;
    }

    public onCancelClick() {
        this.showModal = false;
        this.showStatusModal = false;
        this.showOptions = false;
    }

    public onModalDeleteClick(id: string | undefined) {
        this.recipeService.deleteRecipe(id);
        this.showModal = false;
    }

    public getFavoriteClasses(item: Recipe): string {
        return this.getFavoriteState(item)
            ? "bg-[#f6cc63] border-[#f6cc63] text-black"
            : "bg-[#fffbf7]";
    }

    getRecipes() {
        console.log(this.userId);
        if (!this.userId) {
            return;
        }
        this.isLoading = true;
        if (this.isFavoritesPage) {
            this.recipeService.getRecipes().subscribe((items) => {
                const favoriteRecipes = this.user?.favoriteRecipes;
                if (favoriteRecipes) {
                    this.recipeList = items.filter(
                        (item) =>
                            favoriteRecipes.indexOf(item.uid as string) >= 0
                    );
                    this.filteredList = items.filter(
                        (item) =>
                            favoriteRecipes.indexOf(item.uid as string) >= 0
                    );
                }
            });
        } else if (this.isDashboardPage) {
            this.recipeService.getRecipes().subscribe((items) => {
                this.recipeList = items.filter(
                    (item) => item.publicState === "public"
                );
                this.filteredList = items.filter(
                    (item) => item.publicState === "public"
                );
            });
        } else {
            this.recipeService.getRecipes().subscribe((items) => {
                this.recipeList = items.filter(
                    (item) => item.userId === this.userId
                );
                this.filteredList = items.filter(
                    (item) => item.userId === this.userId
                );
            });
        }

        this.isLoading = false;
    }
}
