import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { selectUsers } from '../../store/selectors/user.selectors';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  users$: Observable<User[]>;
  store = inject(Store);

  constructor() {
    this.users$ = this.store.select(selectUsers);
  }
}
