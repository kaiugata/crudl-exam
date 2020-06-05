import { Role as _Role, User as _User, Sequelize } from "../models";
const Role = _Role;
const User = _User;
const Op = Sequelize.Op;

// Create and Save a new User
export function create(req, res) {
  console.log(req.body);
  // Validate request
  if (req.body.firstName === ''
    || req.body.middleName === ''
    || req.body.lastName === ''
    || req.body.address === ''
    || !req.body.RoleId
    || req.body.RoleId === '') {
    res.status(400).send({
      message: "All fields are required"
    });
    return;
  }

  // Create a User
  const user = {
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    address: req.body.address,
    RoleId: req.body.RoleId
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });

}

// Retrieve all Users from the database.
export function findAll(req, res) {
  Role.findAll()
    .then(roles => {
      User.findAll()
        .then(data => {
          let tA = []
          data.forEach(element => {
            let t = element.dataValues;
            let r = roles.find(role => role.id === t.RoleId)
            t.roleName = r.name;
            tA.push(t)

          });
          res.send(tA);
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving Users."
          });
        });
    })
}

// Find a single User with an id
export function findOne(req, res) {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving User with id=${id}`
      });
    });
}

// Update a User by the id in the request
export function update(req, res) {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        User.findByPk(id)
          .then(data => {
            res.send(data);
          })
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating User with id=${id}`
      });
    });
}

// Delete a User by the id in the request
export function _delete(req, res) {
  const id = req.params.id;
  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          success: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete User with id=${id}`
      });
    });
};

// Delete all Users from the database.
export function deleteAll(req, res) {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
}
