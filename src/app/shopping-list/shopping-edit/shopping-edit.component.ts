import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping-list.actions';
import {Ingredient} from '../../shared/ingredient.model';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false}) formEl: NgForm;
  subscription: Subscription;
  editMode = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(
      storeData => {
        if (storeData.editedIngredientIndex > -1) {
          this.editMode = true;
          const ingr = storeData.editedIngredient;
          this.formEl.resetForm( {
            ingrName: ingr.name,
            ingrAmount: ingr.amount,
          });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  onAddIngredient(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(
        new ShoppingListActions.AddIngredient(
          new Ingredient(
            form.value.ingrName,
            form.value.ingrAmount,
          )
        )
      );
      this.resetForm();
    }
  }

  onEditIngredient(form: NgForm) {
    if (form.valid) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient(new Ingredient(form.value.ingrName, form.value.ingrAmount))
      );
      this.resetForm();
    }
  }

  deleteIngr() {
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient()
    );
    this.resetForm();
  }

  resetForm() {
    this.formEl.resetForm();
    this.editMode = false;
    this.store.dispatch(
      new ShoppingListActions.StopEdit()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.store.dispatch(
      new ShoppingListActions.StopEdit()
    );
  }

}
