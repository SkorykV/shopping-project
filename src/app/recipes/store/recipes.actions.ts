import {Action} from '@ngrx/store';
import {Recipe} from '../recipe.model';


export const SET_RECIPES = '[recipes] SET_RECIPES';
export const ADD_RECIPE = '[recipes] ADD_RECIPE';
export const UPDATE_RECIPE = '[recipes] UPDATE_RECIPE';
export const DELETE_RECIPE = '[recipes] DELETE_RECIPE';
export const FETCH_RECIPES = '[recipes] FETCH_RECIPES';
export const STORE_RECIPES = '[recipes] STORE_RECIPES';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: {id: number; recipe: Recipe}) {}
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}

export type RecipesActions = SetRecipes | AddRecipe | UpdateRecipe | DeleteRecipe | FetchRecipes | StoreRecipes;
