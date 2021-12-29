import { ChangeDetectionStrategy } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  public recipe: Recipe | undefined;

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {}

  async ngOnInit() {
    this.getRecipe();
    this.initFormGroup();
  }

  public initFormGroup() {
    console.log('initformgroup');
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      time: new FormControl(''),
      image: new FormControl(
        'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
      ),
    });
  }
  public createRecipe() {
    this.recipeService.createRecipe(this.form.value).then();
    console.log('create something');
    this.router.navigate(['/recipes']);
  }

  public async getRecipe() {
    console.log('getrecipe');

    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('recipeId');

    await this.recipeService.getRecipes().subscribe((items) => {
      this.recipe = items.find((item) => item.id === productIdFromRoute);
    });
    this.cdRef.detectChanges();

    this.initFormGroup();
  }
}
