import {Component, OnDestroy, OnInit} from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';
import {LoggingService} from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingChangedSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService, private logService: LoggingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingChangedSubscription = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => this.ingredients = ingredients
      );
    this.logService.printLog('hello from shopping list module');
  }

  onEditIngredient(index: number) {
    this.shoppingListService.ingredientStartEdit.next(index);
  }

  ngOnDestroy(): void {
    this.ingChangedSubscription.unsubscribe();
  }

}
