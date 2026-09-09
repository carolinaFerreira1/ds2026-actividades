import { Router } from "express";
import * as libroController from "../controllers/libro.controller";
import { validateBody, validateParams } from "../middlewares/validate.middleware";
import { libroCreateSchema, libroUpdateSchema } from "../validations/libro.validation";
import { idParamSchema } from "../validations/id.validation"; 
import { authenticate, authorize } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", authenticate, libroController.getAll);
router.get("/:id", validateParams(idParamSchema), authenticate, libroController.getById);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validateBody(libroCreateSchema),
  libroController.create
);

router.put(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  validateBody(libroUpdateSchema),
  libroController.update
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  validateParams(idParamSchema),
  libroController.remove
);

export default router;