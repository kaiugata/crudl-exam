const express = require('express');
const router = express.Router();
const Roles = require("../controllers/role.controller.js");

  // Create a new Role
  router.post("/", Roles.create);

  // Retrieve all Roles
  router.get("/", Roles.findAll);

  // Delete a Role with id
  router.delete("/:id", Roles._delete);

  // Delete all Roles
  router.delete("/", Roles.deleteAll);

module.exports = router;
