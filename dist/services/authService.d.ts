import { BaseService } from './baseService';
import { CreateUser, Login } from '../types/user';
export declare class AuthService extends BaseService {
    private rateLimitService;
    constructor();
    register(userData: CreateUser): Promise<{
        user: {
            id: any;
            firstName: any;
            lastName: any;
            email: any;
            role: any;
            phone: any;
            dateOfBirth: any;
            address: any;
            isActive: any;
            createdAt: any;
            updatedAt: any;
        };
        token: string;
        accessToken: string;
        refreshToken: string;
    }>;
    login(loginData: Login): Promise<{
        user: {
            id: any;
            firstName: any;
            lastName: any;
            email: any;
            role: any;
        };
        token: string;
        accessToken: string;
        refreshToken: string;
    }>;
    getCurrentUser(userId: string, fallback?: {
        email: string;
        role: string;
    }): Promise<{
        id: any;
        firstName: any;
        lastName: any;
        email: any;
        role: any;
        phone: any;
        dateOfBirth: any;
        address: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
    }>;
    private storeRefreshToken;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout(refreshToken: string): Promise<{
        success: boolean;
    }>;
    logoutAll(userId: string): Promise<{
        success: boolean;
    }>;
    updateProfile(userId: string, updateData: any): Promise<{
        id: any;
        firstName: any;
        lastName: any;
        email: any;
        role: any;
        phone: any;
        dateOfBirth: any;
        address: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
    }>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<{
        success: boolean;
    }>;
    private transformUserResponse;
}
//# sourceMappingURL=authService.d.ts.map