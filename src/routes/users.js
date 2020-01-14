module.exports = app => {
  const Users = app.db.models.Users;

  //* Nota agregar json web tokens - BCRYPT para cifrar datos  */

  app.post("/login", function(req, res) {
    console.log("logeando..." + req);
    let a = [req.body.email, req.body.password];
    Users.findOne({
      where: {
        email: a[0],
        password: a[1]
      }
    })
      .then(result => res.json(result))
      .catch(error => {
        if (!req.body.id && !req.body.email) {
          res.status(402).json("Email require: Error" + { msm: error.message });
        }
        res.status(412).json({ msg: error.message });
      });
  });

  app.get("/users/:id", (req, res) => {
    Users.findOne(
      { where: { id: req.params.id } },
      {
        attributes: ["id", "name", "email"]
      }
    )
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  });

  app
    .route("/users")
    .get((req, res) => {
      Users.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .post((req, res) => {
      console.log("Registro de user" + req);
      Users.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .put((req, res) => {
      const { name, lastName, email, password } = req.body;
      console.log(req.body);
      Users.update(
        {
          name: name,
          lastName: lastName,
          email: email,
          password: password
        },
        {
          where: {
            idCard: req.body.idCard
          }
        }
      )
        .then(result => {
          res.json(result);
        })
        .catch(error => {
          console.error(error);
          res.status(412).json({ msg: error.message });
        });
    });
  //Cambiar el delete por cambiar el estado del usuario

  app.delete("/users/:id", (req, res) => {
    Users.destroy({ where: { idCard: req.params.idCard } })
      .then(result => res.sendStatus(204))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  });
};
