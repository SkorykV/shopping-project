import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoggingService} from './logging.service';
import {Store} from '@ngrx/store';

import * as fromApp from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
import {AuthService} from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<fromApp.AppState>,
    private authService: AuthService,
    private logService: LoggingService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.AutoLogin());
    // this.logService.printLog('hello from app module');
  }

  ngOnDestroy(): void {
    this.authService.clearAutoLogoutTimer();
  }
}
