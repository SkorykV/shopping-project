import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponseData, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {AlertComponent} from '../shared/alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  alertCloseSubscription: Subscription;
  @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

  constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    let observable: Observable<AuthResponseData>;
    this.isLoading = true;
    this.error = null;

    if (this.isLoginMode) {
      observable = this.authService.login(email, password);
    } else {
      observable = this.authService.signup(email, password);
    }

    observable
      .subscribe(
        resData => {
          this.isLoading = false;
          this.router.navigate(['/recipes']);
        },
        errorMessage => {
          this.error = errorMessage;
          this.showAlertMessage(errorMessage);
          this.isLoading = false;
        }
      );
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
        this.alertCloseSubscription.unsubscribe();
        hostViewContainerRef.clear();
      }
    );
  }
}
