import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomValidators } from '../../validators/custom-validators';
import { selectUserById } from '../../store/selectors/user.selectors';

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
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern(/^[a-zA-Z0-9_]+$/),
        CustomValidators.notAdmin,
      ]),
      age: new FormControl<number | null>(null, [
        Validators.required,
        CustomValidators.ageRange(18, 100),
      ]),
    });

    // Load user data from the store and populate the form
    this.store.select(selectUserById(this.userId)).subscribe((user) => {
      if (user) {
        this.userForm.patchValue({
          email: user.email,
          username: user.username,
          age: user.age,
        });
        this.userForm.markAsPristine();
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
