import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {RecipeService} from '../recipe.service';

@Injectable()
export class RecipeDetailActivateService implements CanActivate {

  constructor(private recipesService: RecipeService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.recipesService.getRecipes().length > 0;
  }
}
