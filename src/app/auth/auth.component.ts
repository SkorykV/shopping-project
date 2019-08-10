import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Subscription} from 'rxjs';
import {Store} from '@ngrx/store';

import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  alertCloseSubscription: Subscription;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.store.select('auth')
      .subscribe(
        authState => {
          this.isLoading = authState.loading;
          this.error = authState.authError;
          if (this.error) {
            this.showAlertMessage(this.error);
          }
        }
      );
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.StartLogin({ email, password }));
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({email, password})
      );
    }
    form.reset();
  }

  ngOnDestroy(): void {
    if (this.alertCloseSubscription) {
      this.alertCloseSubscription.unsubscribe();
    }
  }

  private showAlertMessage(message: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const alertCmpRef = hostViewContainerRef.createComponent(alertCmpFactory);

    alertCmpRef.instance.message = message;
    this.alertCloseSubscription = alertCmpRef.instance.closed.subscribe(
      () => {
        this.store.dispatch(new AuthActions.ClearError());
        this.alertCloseSubscription.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }
}
