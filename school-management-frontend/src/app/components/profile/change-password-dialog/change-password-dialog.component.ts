import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService } from '../../../services/user.service';
import { NotificationService } from '../../../services/notification.service';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.scss'
})
export class ChangePasswordDialogComponent {
  passwordForm: FormGroup;
  isSubmitting = false;
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationService,
    private errorService: ErrorService,
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('newPassword');
    const confirmPassword = control.get('confirmPassword');

    if (!newPassword || !confirmPassword) {
      return null;
    }

    return newPassword.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    this.userService.changePassword({ 
      currentPassword, 
      newPassword,
      confirmPassword 
    }).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response.success) {
          this.notificationService.success('Password changed successfully!');
          this.dialogRef.close(true);
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        const errorMessage = this.errorService.processError(error);
        this.notificationService.error(errorMessage.message, 'Error');
        this.errorService.logError(error, 'ChangePassword.onSubmit');
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.passwordForm.get(fieldName);
    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return `${this.getFieldLabel(fieldName)} is required`;
    }
    if (control.errors['minlength']) {
      return `Password must be at least ${control.errors['minlength'].requiredLength} characters`;
    }

    return 'Invalid value';
  }

  getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      currentPassword: 'Current password',
      newPassword: 'New password',
      confirmPassword: 'Confirm password'
    };
    return labels[fieldName] || fieldName;
  }

  get passwordMismatch(): boolean {
    return this.passwordForm.hasError('passwordMismatch') && 
           this.passwordForm.get('confirmPassword')?.touched || false;
  }
}
