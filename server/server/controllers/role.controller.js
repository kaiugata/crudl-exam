import { Role as _Role, Sequelize } from "../models";
const Role = _Role;
const Op = Sequelize.Op;

// Create and Save a new Role
export function create(req, res) {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name is required"
    });
    return;
  }


  let condition = { name: { [Op.iLike]: `%${req.body.name}%` } }
  //Check for same name role
  Role.findAll({ where: condition })
    .then(data => {
      if (data.length > 0) {
        res.send({ message: "Role already exist" });
      } else {
        // Create a Role
        const role = {
          name: req.body.name
        };
        // Save Role in the database
        Role.create(role)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Role."
            });
          });
      }
    })

}

// Retrieve all Roles from the database.
export function findAll(req, res) {

  Role.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Roles."
      });
    });
}


// Delete a Role with the specified id in the request
export function _delete(req, res) {
  const id = req.params.id;
  Role.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Role was deleted successfully!"
        });
      }
      else {
        res.send({
          message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Role with id=" + id
      });
    });
};


// Delete all Roles from the database.
export function deleteAll(req, res) {
  Role.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Roles were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Roles."
      });
    });
}
