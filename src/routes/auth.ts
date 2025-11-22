import { Router } from 'express';
import { register, login, getProfile, updateProfile, changePassword, refreshToken, logout, logoutAll } from '../controllers/authController';
import { validateBody } from '../middleware/validation';
import { authenticate } from '../middleware/auth';
import { CreateUserSchema, LoginSchema, UpdateUserSchema, ChangePasswordSchema } from '../types/user';
import { sanitizeUser } from '../middleware/sanitization';
import { authRateLimit, registrationRateLimit } from '../middleware/rateLimiting';
import { z } from 'zod';

const router = Router();

// Refresh token schema
const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

// Public routes
router.post('/register', registrationRateLimit, sanitizeUser, validateBody(CreateUserSchema), register);
router.post('/login', authRateLimit, validateBody(LoginSchema), login);
router.post('/refresh', validateBody(RefreshTokenSchema), refreshToken);

// Protected routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, sanitizeUser, validateBody(UpdateUserSchema.partial()), updateProfile);
router.post('/change-password', authenticate, validateBody(ChangePasswordSchema), changePassword);
router.post('/logout', validateBody(RefreshTokenSchema), logout);
router.post('/logout-all', authenticate, logoutAll);

export default router;
