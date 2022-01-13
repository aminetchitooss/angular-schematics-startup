import { createAction, props } from '@ngrx/store';
import { User_Model } from './user.model';

export const setUser = createAction('[USER] Set user info', props<{ user: User_Model }>());
