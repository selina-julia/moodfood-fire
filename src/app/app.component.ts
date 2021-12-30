import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { RecipesService } from './shared/services/recipes/recipes.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'moodfood';
  recipes$: Observable<any[]> | undefined;
  constructor(
    firestore: AngularFirestore,
    private recipeService: RecipesService
  ) {}

  ngOnInit() {
    this.getRecipes();
  }

  async getRecipes() {
    this.recipes$ = this.recipeService.getRecipes();
  }
}
