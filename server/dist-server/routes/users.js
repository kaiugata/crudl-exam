"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _userController = require("../controllers/user.controller.js");

var router = (0, _express.Router)();
// Create a new User
router.post("/", _userController.create); // Retrieve all Users

router.get("/", _userController.findAll); // Retrieve a single User with id

router.get("/:id", _userController.findOne); // Update a User with id

router.put("/:id", _userController.update); // Delete a User with id

router["delete"]("/:id", _userController._delete); // Delete all Users

router["delete"]("/", _userController.deleteAll);
var _default = router;
exports["default"] = _default;