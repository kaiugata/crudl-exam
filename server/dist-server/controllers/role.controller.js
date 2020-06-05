"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.findAll = findAll;
exports._delete = _delete;
exports.deleteAll = deleteAll;

var _models = require("../models");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Role = _models.Role;
var Op = _models.Sequelize.Op; // Create and Save a new Role

function create(req, res) {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name is required"
    });
    return;
  }

  var condition = {
    name: _defineProperty({}, Op.iLike, "%".concat(req.body.name, "%"))
  }; //Check for same name role

  Role.findAll({
    where: condition
  }).then(function (data) {
    if (data.length > 0) {
      res.send({
        message: "Role already exist"
      });
    } else {
      // Create a Role
      var role = {
        name: req.body.name
      }; // Save Role in the database

      Role.create(role).then(function (data) {
        res.send(data);
      })["catch"](function (err) {
        res.status(500).send({
          message: err.message || "Some error occurred while creating the Role."
        });
      });
    }
  });
} // Retrieve all Roles from the database.


function findAll(req, res) {
  Role.findAll().then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving Roles."
    });
  });
} // Delete a Role with the specified id in the request


function _delete(req, res) {
  var id = req.params.id;
  Role.destroy({
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        message: "Role was deleted successfully!"
      });
    } else {
      res.send({
        message: "Cannot delete Role with id=".concat(id, ". Maybe Role was not found!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: "Could not delete Role with id=" + id
    });
  });
}

; // Delete all Roles from the database.

function deleteAll(req, res) {
  Role.destroy({
    where: {},
    truncate: false
  }).then(function (nums) {
    res.send({
      message: "".concat(nums, " Roles were deleted successfully!")
    });
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all Roles."
    });
  });
}