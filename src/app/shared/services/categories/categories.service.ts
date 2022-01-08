import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Category } from '../../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private fireStore: AngularFirestore) {}

  getRecipes(): Observable<Category[]> {
    return this.fireStore
      .collection('categories')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((a) => {
            const data = a.payload.doc.data() as Category;
            const uid = a.payload.doc.id;
            return { uid, ...data };
          });
        })
      );
  }
}
