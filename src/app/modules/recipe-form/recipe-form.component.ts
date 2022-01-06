import { ChangeDetectionStrategy } from '@angular/compiler';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, Observable } from 'rxjs';
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
  public recipe!: Recipe | undefined;
  public selectedImage!: string | undefined;
  public isReady: boolean = false;
  public filePath!: File;
  public previewImage: any;
  public isLoading = false;
  public isUpdating = false;
  public recipeIdFromRoute!: string | null;

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private storage: AngularFireStorage,
    private headerTitleService: HeaderTitleService
  ) {}

  ngOnInit() {
    this.initForm();

    this.recipeIdFromRoute = this.route.snapshot.paramMap.get('recipeId');

    if (this.recipeIdFromRoute) {
      this.isUpdating = true;
      this.getRecipe();
    }

    this.headerTitleService.setTitle('Rezept erstellen');
    this.previewImage = '../../../assets/images/placeholder.jpeg';
  }

  private initForm(): void {
    this.initFormGroup();
    this.listenToFormGroupChanges();
  }

  public initFormGroup() {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      time: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      level: new FormControl('', Validators.required),
      categories: new FormControl(''),
      isFavorite: new FormControl(false),
    });
  }

  public upload(event: Event) {
    this.isLoading = true;
    if ((event?.target as HTMLInputElement).files) {
      const x = (event?.target as HTMLInputElement).files;

      if (x) {
        this.filePath = x[0];
      }
    }

    const filePath = '/images' + Math.random() + this.filePath;
    const fileRef = this.storage.ref(filePath);
    console.log(fileRef);

    this.storage
      .upload(filePath, this.filePath)
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            console.log(url);
            if (url) {
              this.isLoading = false;
            }
            this.form.value['image'] = url;
            this.form.patchValue({ image: url });
            // this.form.controls['image'] = url;
            this.previewImage = url;
          });
        })
      )
      .subscribe();
  }

  private listenToFormGroupChanges(): void {
    this.form.valueChanges.subscribe(() => {
      console.log(this.form);
    });

    // this.subscriptions.add(valueChangesSub);
  }

  public createRecipe() {
    if (!this.isUpdating) {
      this.recipeService.createRecipe(this.form.value).then();
      this.router.navigate(['/recipes']);
    } else {
      this.recipeService.updateRecipe(this.recipe?.uid, this.form.value);
      this.router.navigate(['/recipes']);
    }
  }

  public getRecipe() {
    const recipeIdFromRoute = this.route.snapshot.paramMap.get('recipeId');

    this.recipeService.getRecipes().subscribe((items) => {
      this.recipe = items.find((item) => item.uid === recipeIdFromRoute);
      console.log(this.recipe);
    });

    this.cdRef.detectChanges();
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
}
