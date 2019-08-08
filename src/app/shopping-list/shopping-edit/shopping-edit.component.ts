import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', {static: false}) formEl: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  onAddIngredient(form: NgForm) {
    if (form.valid) {
      this.shoppingListService.addIngredient(new Ingredient(
        form.value.ingrName,
        form.value.ingrAmount,
      ));
      this.resetForm();
    }
  }

  onEditIngredient(form: NgForm) {
    if (form.valid) {
      this.shoppingListService.editIngredient(this.editedItemIndex, form.value.ingrName, form.value.ingrAmount);
      this.resetForm();
    }

  }

  deleteIngr() {
    if (this.editedItemIndex !== null) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
      this.resetForm();
    }
  }

  resetForm() {
    this.formEl.resetForm();
    this.editMode = false;
    this.editedItemIndex = null;
  }

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.ingredientStartEdit.subscribe(
      (id) => {
        this.editMode = true;
        this.editedItemIndex = id;
        const ingr = this.shoppingListService.getIngredient(id);
        this.formEl.resetForm( {
          ingrName: ingr.name,
          ingrAmount: ingr.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
