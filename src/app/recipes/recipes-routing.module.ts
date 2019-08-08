import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes.component';
import {AuthGuard} from '../auth/auth.guard';
import {NotSelectedComponent} from './not-selected/not-selected.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipesResolverService} from './recipes-resolver.service';
import {NgModule} from '@angular/core';


const recipesRoutes: Routes = [
  { path: '', component: RecipesComponent, canActivate: [AuthGuard],
    children: [
      {path: '', component: NotSelectedComponent, pathMatch: 'full'},
      {path: 'new', component: RecipeEditComponent },
      {path: ':id', component: RecipeDetailComponent,
        resolve: [RecipesResolverService],
        /*canActivate: [RecipeDetailActivateService]*/},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(recipesRoutes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
