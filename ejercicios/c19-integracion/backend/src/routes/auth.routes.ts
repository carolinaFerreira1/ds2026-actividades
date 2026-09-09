import { Router } from "express";
import * as authController from "../controllers/auth.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { registroSchema, loginSchema } from "../validations/auth.validation";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post("/registro", validateBody(registroSchema), authController.registrar);
router.post("/login", validateBody(loginSchema), authController.login);

router.get("/yo", authenticate, authController.yo);

export default router;