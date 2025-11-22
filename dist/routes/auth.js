"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const validation_1 = require("../middleware/validation");
const auth_1 = require("../middleware/auth");
const user_1 = require("../types/user");
const sanitization_1 = require("../middleware/sanitization");
const rateLimiting_1 = require("../middleware/rateLimiting");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const RefreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, 'Refresh token is required'),
});
router.post('/register', rateLimiting_1.registrationRateLimit, sanitization_1.sanitizeUser, (0, validation_1.validateBody)(user_1.CreateUserSchema), authController_1.register);
router.post('/login', rateLimiting_1.authRateLimit, (0, validation_1.validateBody)(user_1.LoginSchema), authController_1.login);
router.post('/refresh', (0, validation_1.validateBody)(RefreshTokenSchema), authController_1.refreshToken);
router.get('/profile', auth_1.authenticate, authController_1.getProfile);
router.put('/profile', auth_1.authenticate, sanitization_1.sanitizeUser, (0, validation_1.validateBody)(user_1.UpdateUserSchema.partial()), authController_1.updateProfile);
router.post('/change-password', auth_1.authenticate, (0, validation_1.validateBody)(user_1.ChangePasswordSchema), authController_1.changePassword);
router.post('/logout', (0, validation_1.validateBody)(RefreshTokenSchema), authController_1.logout);
router.post('/logout-all', auth_1.authenticate, authController_1.logoutAll);
exports.default = router;
//# sourceMappingURL=auth.js.map