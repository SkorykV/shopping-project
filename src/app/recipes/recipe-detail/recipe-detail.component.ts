import {Component, Input, OnInit} from '@angular/core';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeId: number;
  recipe: Recipe;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipeId = +params.id;
        this.recipe = this.recipeService.getRecipe(this.recipeId);
      }
    );
  }

  toShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onEditClick() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteClick() {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['recipes']);
  }

}
