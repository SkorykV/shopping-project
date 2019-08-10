import {Actions, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import {environment} from '../../../environments/environment';
import {AuthService} from '../auth.service';
import {User} from '../user.model';
import * as authActions from './auth.actions';


export interface AuthResponseData {
  king: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuth = (email: string, userId: string, token: string, expiresIn: number) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  const user = new User(
    email,
    userId,
    token,
    expirationDate
  );
  localStorage.setItem('userData', JSON.stringify(user));
  return new authActions.Authenticate({user: new User(email, userId, token, expirationDate), redirect: true});
};

const handleError = (errorRes: any) => {
  let errorMessage = 'Unknown Error occurred';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new authActions.AuthenticateFailed(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'User with such email exists';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'User with this email not found';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'Password is incorrect';
      break;
  }
  return of(new authActions.AuthenticateFailed(errorMessage));
};

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(authActions.SIGNUP_START),
    switchMap(
      (signupData: authActions.SignupStart) => {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
          {
            email: signupData.payload.email,
            password: signupData.payload.password,
            returnSecureToken: true,
          })
          .pipe(
            tap(
              resData => {
                this.authService.setAutoLogoutTimer(+resData.expiresIn * 1000);
              }
            ),
            map(
              resData => {
                return handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
              }
            ),
            catchError(
              errorRes => {
                return handleError(errorRes);
              }
            )
          );
      }
    )
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(authActions.START_LOGIN),
    switchMap(
      (authData: authActions.StartLogin) => {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          })
          .pipe(
            tap(
              resData => {
                this.authService.setAutoLogoutTimer(+resData.expiresIn * 1000);
              }
            ),
            map(
              resData => {
                return handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
              }
            ),
            catchError(
              errorRes => {
                return handleError(errorRes);
              }
            )
          );
      }
    )
  );

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(authActions.AUTO_LOGIN),
    map(
      () => {
        const userData: {
          email: string,
          id: string,
          _token: string,
          _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
          return {type: 'UNKNOWN_ACTION'};
        }

        const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (user.token) {
          this.authService.setAutoLogoutTimer(new Date(userData._tokenExpirationDate).getTime() - new Date().getTime());
          return new authActions.Authenticate({user, redirect: false});
        } else {
          return {type: 'UNKNOWN_ACTION'};
        }
      }
    )
  );

  @Effect({dispatch: false})
  authChange = this.actions$.pipe(
    ofType(authActions.AUTHENTICATE),
    tap(
      (action: authActions.Authenticate) => {
        if (action.payload.redirect) {
          this.router.navigate(['/recipes']);
        }
      }
    )
  );

  @Effect({dispatch: false})
  logout = this.actions$.pipe(
    ofType(authActions.LOGOUT),
    tap(
      () => {
        this.authService.clearAutoLogoutTimer();
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
      }
    )
  );
}
