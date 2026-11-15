import { Router } from "express";
import * as autorController from "../controllers/autor.controller";
import { validateBody, validateParams } from "../middlewares/validate.middleware";
import { autorCreateSchema, autorUpdateSchema } from "../validations/autor.validations";
import { idParamSchema } from "../validations/id.validation";
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();
router.get("/", autorController.getAll);
router.get("/:id", validateParams(idParamSchema), autorController.getById);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validateBody(autorCreateSchema),
  autorController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  validateBody(autorUpdateSchema),
  autorController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  autorController.remove
);

export default router;