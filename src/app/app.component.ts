import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { Observable } from "rxjs";
import { AuthService } from "./shared/services/auth/auth.service";
import { RecipesService } from "./shared/services/recipes/recipes.service";

@Component({
    selector: "app-root",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.scss"]
})
export class AppComponent implements OnInit {
    title = "moodfood";
    recipes$: Observable<any[]> | undefined;
    constructor(
        firestore: AngularFirestore,
        private recipeService: RecipesService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.getRecipes();
        this.authService.fetchUser();
    }

    async getRecipes() {
        this.recipes$ = this.recipeService.getRecipes();
    }
}
