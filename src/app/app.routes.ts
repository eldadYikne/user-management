import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'edit/:id', component: UserEditComponent },
];
