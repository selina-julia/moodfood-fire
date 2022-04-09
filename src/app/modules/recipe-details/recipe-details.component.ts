import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable, of } from "rxjs";

import { Recipe } from "../recipes/shared/recipe";
import { RecipesService } from "../../shared/services/recipes/recipes.service";
import { HeaderTitleService } from "src/app/shared/services/headerTitle/headerTitle.service";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Category } from "src/app/shared/models/category";
import { CategoriesService } from "src/app/shared/services/categories/categories.service";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { User } from "src/app/shared/models/user";

@Component({
    selector: "app-recipe-details",
    templateUrl: "./recipe-details.component.html",
    styleUrls: ["./recipe-details.component.scss"]
})
export class RecipeDetailsComponent implements OnInit {
    public recipe: Recipe | undefined;
    public category?: Category;
    public userId?: string;
    public user?: User;
    public showModal = false;

    constructor(
        private route: ActivatedRoute,
        private recipeService: RecipesService,
        private categoriesService: CategoriesService,
        private headerTitleService: HeaderTitleService,
        private router: Router,
        private authService: AuthService,
        private cdRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.refreshCurrentUser();
        this.headerTitleService.setTitle("");

        const routeParams = this.route.snapshot.paramMap;
        const productIdFromRoute = routeParams.get("recipeId");

        this.recipeService.getRecipes().subscribe((items) => {
            this.recipe = items.find((item) => {
                return item.uid === productIdFromRoute;
            });
            console.log(this.recipe);
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

    // public async refreshCurrentUser(): Promise<void> {
    //   this.authService.fetchUser();

    //   this.authService.user$.subscribe((val) => {
    //     if (val) {
    //       this.userId = val.uid;
    //       this.user = val;
    //     }
    //   });
    // }

    // public getAuthorById(id: string | undefined) {

    //   this.authService.getUsers().subscribe((items) => {
    //     this.user = items.find((item) => {
    //       return item.uid === id;
    //     });
    //   });
    // }

    public refreshCurrentUser(): void {
        this.authService.user$.subscribe((val) => {
            if (val) {
                this.user = val?.email ? val : undefined;
            }
            this.cdRef.detectChanges();
        });
    }

    public onCancelClick() {
        this.showModal = false;
    }

    public getDeleteRecipeModalData() {
        return {
            headline: "Rezept löschen",
            description: `Bist du sicher, dass du das Rezept '${this.recipe?.title}' löschen möchtest?`,
            actionButton: "Löschen",
            cancelButton: "Abbrechen"
        };
    }

    public onModalDeleteClick(id: string | undefined) {
        this.recipeService.deleteRecipe(id);
        this.showModal = false;
        this.router.navigate(["/myrecipes"]);
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
