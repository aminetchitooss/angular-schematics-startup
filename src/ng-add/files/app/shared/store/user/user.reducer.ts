import { createReducer, on } from '@ngrx/store';
import { setUser } from './user.actions';
import { User_Model } from './user.model';

export const initialState = {} as User_Model;

export const userReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => user)
);
