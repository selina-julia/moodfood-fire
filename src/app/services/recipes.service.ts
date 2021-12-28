import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private firestore: AngularFirestore) {}

  getRecipes(): Observable<any[]> {
    return this.firestore.collection('recipes').valueChanges();
  }
}
