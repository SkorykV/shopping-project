import {NgModule} from '@angular/core';
import {RecipeDetailActivateService} from './recipes/recipe-detail/recipe-detail-activate.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './auth/auth-interceptor.service';

@NgModule({
  providers: [
    RecipeDetailActivateService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    }
  ],
})
export class CoreModule {}
