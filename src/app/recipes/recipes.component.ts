import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
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
