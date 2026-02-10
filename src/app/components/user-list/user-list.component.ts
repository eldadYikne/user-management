import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { loadUsers, deleteUser } from '../../store/actions/user.actions';
import { selectUsers, selectLoading, selectError } from '../../store/selectors/user.selectors';
import { CapitalizePipe } from '../../pipes/capitalize-pipe';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink, CapitalizePipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  fields: (keyof User)[] = ['id', 'username', 'email', 'age'];
  store = inject(Store);
  constructor() {
    this.users$ = this.store.select(selectUsers);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }
  loadUsers(): void {
    this.store.dispatch(loadUsers());
  }
  onDelete(user: User): void {
    console.log('Deleted user:', user);
    this.store.dispatch(deleteUser({ userId: user.id }));
  }
}
