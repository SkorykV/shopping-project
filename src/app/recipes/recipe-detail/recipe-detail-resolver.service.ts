import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Recipe} from '../recipe.model';
import {Injectable} from '@angular/core';
import {RecipeService} from '../recipe.service';

@Injectable()
export class RecipeDetailResolver {
  constructor(private recipeService: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Promise<Recipe> | Recipe {
    return this.recipeService.getRecipe(+route.params.id);
  }
}
