import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { HeaderTitleService } from 'src/app/shared/services/headerTitle/headerTitle.service';
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
  public deleteItem: Recipe | undefined;

  constructor(
    firestore: AngularFirestore,
    private recipeService: RecipesService,
    private fb: FormBuilder,
    private headerTitleService: HeaderTitleService
  ) {}

  ngOnInit() {
    this.getRecipes();
    this.initFormGroup();
    this.headerTitleService.setTitle('Dashboard');
  }

  public initFormGroup() {
    this.form = this.fb.group({
      title: '',
    });
  }

  public createRecipe() {
    this.recipeService.createRecipe(this.form.value).then();
  }

  public deleteRecipe(id: Recipe) {
    this.showModal = true;
    this.deleteItem = id;
  }

  public onCancelClick() {
    this.showModal = false;
  }

  public onModalDeleteClick(id: string | undefined) {
    this.recipeService.deleteRecipe(id);
    this.showModal = false;
    console.log(id);
  }

  async getRecipes() {
    this.recipes$ = this.recipeService.getRecipes();
  }
}
