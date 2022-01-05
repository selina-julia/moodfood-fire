import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Recipe } from '../../../modules/recipes/shared/recipe';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private firestore: AngularFirestore) {}

  getRecipes(): Observable<Recipe[]> {
    // return this.firestore.collection('recipes').valueChanges();

    return this.firestore
      .collection('recipes')
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

  createRecipe(payload: Recipe) {
    return this.firestore.collection('recipes').add(payload);
  }

  updateRecipe(id: string | undefined, payload: Recipe) {
    return this.firestore.doc('recipes/' + id).update(payload);
  }

  deleteRecipe(id: string | undefined) {
    return this.firestore.doc('recipes/' + id).delete();
  }

  getRecipeById(id: string) {
    return this.firestore.doc('recipes/' + id);
  }
}
