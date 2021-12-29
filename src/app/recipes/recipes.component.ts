import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from './shared/recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent implements OnInit {
  public recipes$!: Observable<Recipe[]>;
  public form!: FormGroup;
  public recipes: Recipe[] = [];

  constructor(
    firestore: AngularFirestore,
    private recipeService: RecipesService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getRecipes();
    this.initFormGroup();
  }

  public initFormGroup() {
    this.form = this.fb.group({
      title: '',
    });
  }

  public openModal(content: TemplateRef<any>) {}

  public createRecipe() {
    this.recipeService.createRecipe(this.form.value).then();
    console.log('create something');
  }

  public deleteRecipe(id: string | undefined) {
    this.recipeService.deleteRecipe(id);
  }

  async getRecipes() {
    this.recipes$ = this.recipeService.getRecipes();
  }
}
