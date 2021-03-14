import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
   recipesChanged = new Subject<Recipe[]>();
   private recipes: Recipe[] =[];
  //  private recipes: Recipe[] = [
  //   new Recipe('Tasty Schnitzel',
  //   'Super tasty Schnitzel',
  //   'https://www.daringgourmet.com/wp-content/uploads/2014/03/Schnitzel-5.jpg',
  //   [
  //     new Ingredient('Meat', 1),
  //     new Ingredient('French Fries', 20)
  //   ]),
  //   new Recipe('Big Fat Burger',
  //   'What else you need to say?',
  //   'https://cookieandkate.com/images/2013/05/best-veggie-burger-recipe-3.jpg',
  //   [
  //     new Ingredient('Buns', 2),
  //     new Ingredient('Meat', 1)
  //   ])
  // ];

  constructor(private shoppingListService:ShoppingListService){

  }
  getRecipe() {
    return this.recipes.slice();
  }
  
  getRecipeById(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe:Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]){
   this.shoppingListService.addIngredients(ingredients);
  }
  
  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());

  }

  setRecipes(recipes:Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());

  }
}
