import { Router } from 'express';
const router = Router();
import { create, findAll, findOne, update, _delete, deleteAll } from "../controllers/user.controller.js";

  // Create a new User
  router.post("/", create);

  // Retrieve all Users
  router.get("/", findAll);

  // Retrieve a single User with id
  router.get("/:id", findOne);

  // Update a User with id
  router.put("/:id", update);

  // Delete a User with id
  router.delete("/:id", _delete);

  // Delete all Users
  router.delete("/", deleteAll);

export default router;
