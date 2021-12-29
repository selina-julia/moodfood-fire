import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Recipe } from '../recipes/shared/recipe';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  public recipes$!: Observable<Recipe[]>;
  public form!: FormGroup;
  public recipes: Recipe[] = [];

  constructor(
    firestore: AngularFirestore,
    private recipeService: RecipesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initFormGroup();
  }

  public initFormGroup() {
    this.form = this.fb.group({
      title: '',
    });
  }
  public createRecipe() {
    this.recipeService.createRecipe(this.form.value).then();
    console.log('create something');
  }
}
