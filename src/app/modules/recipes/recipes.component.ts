import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { RecipesService } from 'src/app/shared/services/recipes/recipes.service';
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
  public showModal: boolean = false;

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

  public createRecipe() {
    this.recipeService.createRecipe(this.form.value).then();
  }

  public deleteRecipe() {
    this.showModal = true;
    // this.recipeService.deleteRecipe(id);
  }

  public onCancelClick() {
    this.showModal = false;
  }

  public onModalDeleteClick(id: string | undefined) {
    this.recipeService.deleteRecipe(id);
    this.showModal = false;
  }

  async getRecipes() {
    this.recipes$ = this.recipeService.getRecipes();
  }
}
