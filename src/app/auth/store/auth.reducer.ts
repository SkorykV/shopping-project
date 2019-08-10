import {User} from '../user.model';
import * as authActions from './auth.actions';

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state: State = initialState,
  action: authActions.authActions
) {
  switch (action.type) {
    case authActions.START_LOGIN:
    case authActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case authActions.AUTHENTICATE:
      return {
        ...state,
        user: action.payload.user,
        loading: false,
      };
    case authActions.AUTHENTICATE_FAILED:
      return {
        ...state,
        authError: action.payload,
        loading: false,
      };
    case authActions.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case authActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
}
