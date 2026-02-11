import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomValidators } from '../../validators/custom-validators';
import { selectUserById } from '../../store/selectors/user.selectors';
import { take } from 'rxjs';

@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss',
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup;
  userId!: number;
  route = inject(ActivatedRoute);
  router = inject(Router);
  store = inject(Store);

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));

    this.userForm = new FormGroup({
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      username: new FormControl<string>('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern(/^[a-zA-Z0-9_]+$/),
          CustomValidators.notAdmin,
        ],
      }),
      age: new FormControl<number>(18, {
        nonNullable: true,
        validators: [Validators.required, CustomValidators.ageRange(18, 100)],
      }),
    });
    this.store
      .select(selectUserById(this.userId))
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          this.userForm.patchValue(user);
          this.userForm.markAsPristine();
        } else {
          console.warn(`User with ID ${this.userId} not found. Redirecting to user list.`);
          this.router.navigate(['/']);
        }
      });
  }

  get email() {
    return this.userForm.get('email')!;
  }

  get username() {
    return this.userForm.get('username')!;
  }

  get age() {
    return this.userForm.get('age')!;
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      console.log('Form submitted:', {
        id: this.userId,
        ...this.userForm.value,
      });
      this.router.navigate(['/']);
    }
  }
}
