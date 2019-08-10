import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../recipe.model';
import {Subscription} from 'rxjs';
import * as fromApp from '../../store/app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  recipes: Recipe[];

  constructor(
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.subscription = this.store.select('recipes').subscribe(
      recipesState => this.recipes = recipesState.recipes
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
