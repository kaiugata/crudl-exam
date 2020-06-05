"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;
exports.update = update;
exports._delete = _delete;
exports.deleteAll = deleteAll;

var _models = require("../models");

var Role = _models.Role;
var User = _models.User;
var Op = _models.Sequelize.Op; // Create and Save a new User

function create(req, res) {
  console.log(req.body); // Validate request

  if (req.body.firstName === '' || req.body.middleName === '' || req.body.lastName === '' || req.body.address === '' || !req.body.RoleId || req.body.RoleId === '') {
    res.status(400).send({
      message: "All fields are required"
    });
    return;
  } // Create a User


  var user = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    address: req.body.address,
    RoleId: req.body.RoleId
  }; // Save User in the database

  User.create(user).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the User."
    });
  });
} // Retrieve all Users from the database.


function findAll(req, res) {
  Role.findAll().then(function (roles) {
    User.findAll().then(function (data) {
      var tA = [];
      data.forEach(function (element) {
        var t = element.dataValues;
        var r = roles.find(function (role) {
          return role.id === t.RoleId;
        });
        t.roleName = r.name;
        tA.push(t);
      });
      res.send(tA);
    })["catch"](function (err) {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users."
      });
    });
  });
} // Find a single User with an id


function findOne(req, res) {
  var id = req.params.id;
  User.findByPk(id).then(function (data) {
    res.send(data);
  })["catch"](function (err) {
    res.status(500).send({
      message: "Error retrieving User with id=".concat(id)
    });
  });
} // Update a User by the id in the request


function update(req, res) {
  var id = req.params.id;
  User.update(req.body, {
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      User.findByPk(id).then(function (data) {
        res.send(data);
      });
    } else {
      res.send({
        message: "Cannot update User with id=".concat(id, ". Maybe User was not found or req.body is empty!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: "Error updating User with id=".concat(id)
    });
  });
} // Delete a User by the id in the request


function _delete(req, res) {
  var id = req.params.id;
  User.destroy({
    where: {
      id: id
    }
  }).then(function (num) {
    if (num == 1) {
      res.send({
        success: "User was deleted successfully!"
      });
    } else {
      res.send({
        message: "Cannot delete User with id=".concat(id, ". Maybe User was not found!")
      });
    }
  })["catch"](function (err) {
    res.status(500).send({
      message: "Could not delete User with id=".concat(id)
    });
  });
}

; // Delete all Users from the database.

function deleteAll(req, res) {
  User.destroy({
    where: {},
    truncate: false
  }).then(function (nums) {
    res.send({
      message: "".concat(nums, " Users were deleted successfully!")
    });
  })["catch"](function (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while removing all Users."
    });
  });
}