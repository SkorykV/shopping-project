import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import {AppRoutesModule} from './app-routes.module';
import {HttpClientModule} from '@angular/common/http';
import {AlertComponent} from './shared/alert/alert.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core.module';
import {LoggingService} from './logging.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutesModule,
    HttpClientModule,
    SharedModule,
    CoreModule
  ],
  providers: [LoggingService],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent
  ]
})
export class AppModule { }
