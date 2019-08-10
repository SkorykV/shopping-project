import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';

import { Ingredient } from '../shared/ingredient.model';
import {Observable, Subscription} from 'rxjs';
import {LoggingService} from '../logging.service';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(private logService: LoggingService,
              private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.ingredients = this.store.select('shoppingList');
    this.logService.printLog('hello from shopping list module');
  }

  onEditIngredient(index: number) {
    this.store.dispatch(
      new ShoppingListActions.StartEdit(index)
    );
  }

}
