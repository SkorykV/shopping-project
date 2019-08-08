import {NgModule} from '@angular/core';
import {RecipeService} from './recipes/recipe.service';
import {RecipeDetailResolver} from './recipes/recipe-detail/recipe-detail-resolver.service';
import {RecipeDetailActivateService} from './recipes/recipe-detail/recipe-detail-activate.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './auth/auth-interceptor.service';

@NgModule({
  providers: [
    RecipeService,
    RecipeDetailResolver,
    RecipeDetailActivateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
})
export class CoreModule {}
