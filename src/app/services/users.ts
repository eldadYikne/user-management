import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor() {}
  MOCK_USERS: User[] = [
    { id: 1, email: 'user1@example.com', username: 'john_doe', age: 25 },
    { id: 2, email: 'user2@example.com', username: 'jane_smith', age: 30 },
    { id: 3, email: 'admin@example.com', username: 'admin', age: 35 },
    { id: 4, email: 'test@test.com', username: 'test_user', age: 22 },
  ];

  getUsers(): Observable<User[]> {
    return new Observable((observer) => {
      observer.next(this.MOCK_USERS);
      observer.complete();
    });
  }
}
