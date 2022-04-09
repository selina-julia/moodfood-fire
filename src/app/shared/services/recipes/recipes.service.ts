import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { BehaviorSubject, map, Observable, take } from "rxjs";
import { Recipe } from "../../../modules/recipes/shared/recipe";
import { Category } from "../../models/category";
@Injectable({
    providedIn: "root"
})
export class RecipesService {
    private categories = new BehaviorSubject<Map<string, Category | undefined>>(
        new Map()
    );
    public recipes$ = new BehaviorSubject<Recipe[] | undefined>(undefined);

    constructor(private firestore: AngularFirestore) {}

    getRecipes(): Observable<Recipe[]> {
        return this.firestore
            .collection("recipes")
            .snapshotChanges()
            .pipe(
                map((actions) => {
                    return actions.map((a) => {
                        const data = a.payload.doc.data() as Recipe;
                        const uid = a.payload.doc.id;
                        return { uid, ...data };
                    });
                })
            );
    }

    getCategoriesForRecipe(id: string | undefined) {
        return this.firestore.doc("categories/" + id);
    }

    createRecipe(payload: Recipe) {
        console.log(payload);
        return this.firestore.collection("recipes").add(payload);
    }

    updateRecipe(id: string | undefined, payload: Recipe) {
        return this.firestore.doc("recipes/" + id).update(payload);
    }

    deleteRecipe(id: string | undefined) {
        return this.firestore.doc("recipes/" + id).delete();
    }

    getRecipeById(id: string | undefined) {
        return this.firestore.doc("recipes/" + id);
    }

    // public addAuthor(userId: string, author: PcUser | undefined): void {
    //   const authors = this.authors.getValue();
    //   authors.set(userId, author);
    //   this.authors.next(authors);
    // }

    get categories$(): BehaviorSubject<Map<string, Category | undefined>> {
        return this.categories;
    }

    category$(uid: string): Observable<Category | undefined> {
        return this.categories.pipe(
            map((categoriesMap) => categoriesMap?.get(uid))
        );
    }
}
