import { ChangeDetectionStrategy } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RecipesService } from 'src/app/shared/services/recipes/recipes.service';
import { Recipe } from '../recipes/shared/recipe';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { HeaderTitleService } from 'src/app/shared/services/headerTitle/headerTitle.service';

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
  public selectedImage!: string | undefined;

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private storage: AngularFireStorage,
    private headerTitleService: HeaderTitleService
  ) {}

  async ngOnInit() {
    this.getRecipe();
    this.initFormGroup();

    this.headerTitleService.setTitle('Rezept erstellen');
  }

  public initFormGroup() {
    console.log('initformgroup');
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      time: new FormControl(''),
      image: new FormControl(
        'https://a.storyblok.com/f/134761/4032x3024/45917713ab/img_1435.jpg'
      ),
      imageSource: new FormControl(''),
      level: new FormControl(1),
      categories: new FormControl(''),
      isFavorite: new FormControl(false),
    });
  }
  public createRecipe() {
    const formData = new FormData();
    formData.append('image', this.form?.get('imageSource')?.value);

    console.log(this.form);

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

  public onFileSelected(event: Event) {
    if ((event?.target as HTMLInputElement).files) {
      const x = (event?.target as HTMLInputElement).files;

      if (x) {
        const file = x[0];
        const filePath = '/RecipeImages/';
        const task = this.storage.upload(filePath, file);
      }
    }
  }

  // public onFileSelected(event: Event) {
  //   console.log(event);

  //   const x = (event?.target as HTMLInputElement).files;
  //   if (x) {
  //     this.selectedImage = x[0].name;
  //   }

  //   if (x) {
  //     const file = x[0] as File;
  //     this.form.controls['image'].setValue(file.name);
  //     console.log(this.form.controls['image'].value);
  //   }

  //   console.log(this.selectedImage);
  // }
}
