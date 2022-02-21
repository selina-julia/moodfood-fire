import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthFormComponent } from "./modules/auth-form/auth-form.component";
import { RecipeDetailsComponent } from "./modules/recipe-details/recipe-details.component";
import { RecipeFormComponent } from "./modules/recipe-form/recipe-form.component";
import { RecipesComponent } from "./modules/recipes/recipes.component";
import { RegisterFormComponent } from "./modules/register-form/register-form.component";
import { UserSettingsComponent } from "./modules/user-settings/user-settings.component";

const routes: Routes = [
    { path: "", redirectTo: "/recipes", pathMatch: "full" },

    {
        path: "recipes",
        loadChildren: () =>
            import("./modules/recipes/recipes.module").then(
                (m) => m.RecipesModule
            )
    },
    { path: "recipes/:recipeId", component: RecipeDetailsComponent },
    { path: "recipes/edit/:recipeId", component: RecipeFormComponent },
    { path: "create", component: RecipeFormComponent },
    { path: "favorites", component: RecipesComponent },
    { path: "auth", component: AuthFormComponent },
    { path: "register", component: RegisterFormComponent },
    { path: "myrecipes", component: RecipesComponent },
    { path: "settings", component: UserSettingsComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
