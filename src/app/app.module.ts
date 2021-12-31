import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RecipesModule } from './modules/recipes/recipes.module';
import { RecipesComponent } from './modules/recipes/recipes.component';
import { HeaderComponent } from './shared/modules/layout/header/header.component';
import { RecipeDetailsComponent } from './modules/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './modules/recipe-form/recipe-form.component';
import { FooterComponent } from './shared/modules/layout/footer/footer.component';
import { ButtonComponent } from './shared/modules/ui/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeDetailsComponent,
    RecipeFormComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    RecipesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
