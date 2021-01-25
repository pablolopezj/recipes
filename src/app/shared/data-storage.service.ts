import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from "rxjs/operators";

import { Recipe } from './../recipes/recipe.model';
import { RecipeService } from './../recipes/recipe.service';
import { AuthService } from './../auth/auth.services';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(
    private http: HttpClient, 
    private recipesService: RecipeService,
    private authService: AuthService
    ) {}

  storeRecipes(){
    const recipes = this.recipesService.getRecipes();
    this.http.put(
      'https://ng-posts-testing-default-rtdb.firebaseio.com/recipes.json',
      recipes
    ).subscribe(respnse => {
      console.log(respnse);
    });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://ng-posts-testing-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
          map(recipes => {
            return recipes.map(recipe => {
              return {
                ...recipe, 
                ingredients: recipe.ingredients ? recipe.ingredients: []
              };
            });
          }),
          tap(recipes => {
              this.recipesService.setRecipes(recipes);
          })
        );
  }
}