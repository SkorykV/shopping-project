import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {Recipe} from '../recipe.model';
import * as RecipesActions from './recipes.actions';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipesEffects {

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(
      () => {
        return this.http.get<Recipe[]>(
          'https://ng-course-recipe-book-22eb5.firebaseio.com/recipes.json'
        );
      }
    ),
    map(
      recipes => recipes.map(
        (recipe) => ({
          ...recipe,
          ingredients: recipe.ingredients || [],
        })
      )
    ),
    map(
      recipes => new RecipesActions.SetRecipes(recipes)
    )
  );

  @Effect({dispatch: false})
  storeResults = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(
      ([action, recipesStore]) => {
        return this.http.put('https://ng-course-recipe-book-22eb5.firebaseio.com/recipes.json', recipesStore.recipes);
      }
    )
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
