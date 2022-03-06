import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { finalize, Observable } from "rxjs";
import { Category } from "src/app/shared/models/category";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CategoriesService } from "src/app/shared/services/categories/categories.service";
import { HeaderTitleService } from "src/app/shared/services/headerTitle/headerTitle.service";
import { RecipesService } from "src/app/shared/services/recipes/recipes.service";
import { Recipe } from "../recipes/shared/recipe";

@Component({
    selector: "app-recipe-form",
    templateUrl: "./recipe-form.component.html",
    styleUrls: ["./recipe-form.component.scss"]
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
    public categories!: Category[];
    public userId?: string;
    public showModal = false;
    public isCategorySelected = false;
    public selectedCategory!: Category;

    constructor(
        private recipeService: RecipesService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private cdRef: ChangeDetectorRef,
        private router: Router,
        private storage: AngularFireStorage,
        private headerTitleService: HeaderTitleService,
        private categoriesService: CategoriesService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.recipeIdFromRoute = this.route.snapshot.paramMap.get("recipeId");

        this.initForm();
        this.getCategories();

        if (this.recipeIdFromRoute) {
            this.isUpdating = true;
            this.getRecipe();
        }

        this.headerTitleService.setTitle("Rezept erstellen");
        this.previewImage = "../../../assets/images/placeholder.jpeg";
    }

    private initForm(): void {
        this.refreshCurrentUser();
        this.initFormGroup();
        this.listenToFormGroupChanges();
    }

    public refreshCurrentUser(): void {
        this.authService.fetchUser();

        this.authService.user$.subscribe((val) => {
            if (val) {
                this.userId = val.uid;
            }
        });
    }

    public initFormGroup() {
        this.form = new FormGroup({
            title: new FormControl("", Validators.required),
            description: new FormControl(""),
            time: new FormControl("", Validators.required),
            image: new FormControl("", Validators.required),
            level: new FormControl("", Validators.required),
            categories: new FormControl(""),
            isFavorite: new FormControl(false),
            publicState: new FormControl("private"),
            userId: new FormControl(""),
            cookingSteps: this.fb.array([])
        });
        this.setUserId();
    }

    public cookingSteps(): FormArray {
        return this.form.get("cookingSteps") as FormArray;
    }

    public newStep(): FormGroup {
        return this.fb.group({
            text: ""
        });
    }

    public addCookingStep() {
        this.cookingSteps().push(this.newStep());
    }

    public setUserId() {
        this.form.value["userId"] = this.userId;
        this.form.patchValue({ userId: this.userId });
    }

    public getCategories() {
        this.categoriesService.getRecipes().subscribe((items) => {
            this.categories = items;
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

        const filePath = "/images" + Math.random() + this.filePath;
        const fileRef = this.storage.ref(filePath);

        this.storage
            .upload(filePath, this.filePath)
            .snapshotChanges()
            .pipe(
                finalize(() => {
                    fileRef.getDownloadURL().subscribe((url) => {
                        if (url) {
                            this.isLoading = false;
                        }
                        this.form.value["image"] = url;
                        this.form.patchValue({ image: url });
                        // this.form.controls['image'] = url;
                        this.previewImage = url;
                    });
                })
            )
            .subscribe();
    }

    private listenToFormGroupChanges(): void {
        this.form.valueChanges.subscribe(() => {});

        // this.subscriptions.add(valueChangesSub);
    }

    public refreshCreateModalState() {
        this.showModal = !this.showModal;
    }

    public getCreateModalData() {
        return {
            headline: this.isUpdating
                ? "Änderungen speichern"
                : "Rezept erstellen",
            description:
                "Möchtest du die Änderungen für dieses Rezept speichern?",
            actionButton: "Speichern",
            cancelButton: "Abbrechen"
        };
    }

    public refreshCategorySelect(cat: Category) {
        this.selectedCategory = cat;
        this.isCategorySelected = !this.isCategorySelected;
    }

    public showSelectedCat(item: Category) {
        return item === this.selectedCategory;
    }

    public createRecipe() {
        if (!this.isUpdating) {
            this.recipeService.createRecipe(this.form.value).then();
            this.router.navigate(["/myrecipes"]);
        } else {
            this.setUserId();
            this.recipeService.updateRecipe(this.recipe?.uid, this.form.value);
            this.router.navigate(["/myrecipes"]);
        }
    }

    public getRecipe() {
        const recipeIdFromRoute = this.route.snapshot.paramMap.get("recipeId");

        this.recipeService.getRecipes().subscribe((items) => {
            this.recipe = items.find((item) => {
                return item.uid === recipeIdFromRoute;
            });
            this.cdRef.detectChanges();
        });

        // todo: better solution than timeout
        setTimeout(() => {
            this.form.patchValue({
                title: this.recipe?.title,
                description: this.recipe?.description,
                time: this.recipe?.time,
                image: this.recipe?.image,
                level: this.recipe?.level
            });
            this.previewImage = this.recipe?.image;
        }, 1000);

        this.cdRef.detectChanges();
    }

    public onFileSelected(event: Event) {
        if ((event?.target as HTMLInputElement).files) {
            const x = (event?.target as HTMLInputElement).files;

            if (x) {
                const file = x[0];
                const filePath = "/RecipeImages/";
                const task = this.storage.upload(filePath, file);
            }
        }
    }
}
