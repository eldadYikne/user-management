import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from '../actions/user.actions';
import { UsersService } from '../../services/users.service';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private usersService = inject(UsersService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError(() => of(loadUsersFailure({ error: 'Failed to load users' }))),
        ),
      ),
    ),
  );
}
