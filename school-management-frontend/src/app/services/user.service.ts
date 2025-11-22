import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  getProfile(): Observable<any> {
    return this.apiService.get('auth/profile');
  }

  updateProfile(data: UpdateProfileData): Observable<any> {
    return this.apiService.put('auth/profile', data);
  }

  changePassword(data: ChangePasswordData): Observable<any> {
    return this.apiService.post('auth/change-password', data);
  }
}
