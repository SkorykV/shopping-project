import {Action} from '@ngrx/store';
import {User} from '../user.model';

export const START_LOGIN = '[auth] START_LOGIN';
export const AUTHENTICATE = '[auth] AUTHENTICATE';
export const AUTHENTICATE_FAILED = '[auth] AUTHENTICATE_FAILED';
export const LOGOUT = '[auth] LOGOUT';
export const AUTO_LOGIN = '[auth] AUTO_LOGIN';

export const SIGNUP_START = '[auth] SIGNUP_START';
export const CLEAR_ERROR = '[auth] CLEAR_ERROR';

export class StartLogin implements Action {
  readonly type = START_LOGIN;

  constructor(public payload: {email: string, password: string}) {}
}

export class Authenticate implements Action {
  readonly type = AUTHENTICATE;

  constructor(public payload: {user: User, redirect: boolean}) {}
}

export class AuthenticateFailed implements Action {
  readonly type = AUTHENTICATE_FAILED;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: {email: string, password: string}) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type authActions = Authenticate | Logout | AutoLogin | StartLogin | AuthenticateFailed | SignupStart | ClearError;
