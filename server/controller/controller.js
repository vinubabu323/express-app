var UserDB = require("../model/model");

//create and save user
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  const user = new UserDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
    image: req.file.filename,
    deleted: false,
  });
  
  user
    .save(user)
    .then((data) => {
      res.redirect("/add-user");
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating a create operation",
      });
    });
};

//retrieve and return all users/ retrive and return a single user

exports.find = (req, res) => {
  const id = req.query.id;
  if (id) {
    UserDB.findById(id, { deleted: false })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Not found user with id " + id,
        });
      });
  } else {
    UserDB.find({ deleted: false })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Error occured while retrieving users",
        });
      });
  }
};

//Update a new identified user by user id

exports.update = (req, res) => {
  console.log(req.file);
  if (!req.body) {
    return res.status(400).send({ message: "Data to update can't be empty" });
  }
  const data = req.body;
  data.image = req?.file?.filename;

  const id = req.params.id;

  UserDB.findByIdAndUpdate(id, req.body, { new: true }, function (err, item) {
    if (err) {
      // Handle the error
      res.status(500).send({ error: "Failed to update the item" });
    } else {
      // Return the updated item
      res.status(200).send({ item: item, status: 200 });
    }
  });
};

//Delete a user with specified user_id in the request

exports.delete = (req, res) => {
  const id = req.params.id;

  UserDB.updateOne({ _id: id }, { $set: { deleted: true } }, (err) => {
    if (err) return res.status(500).send(err);
    return res.send({ message: "Record deleted successfully." });
  });
};
