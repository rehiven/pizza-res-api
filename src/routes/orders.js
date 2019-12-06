module.exports = app => {
  //Modelos que seran utilizados para manipular la base de datos
  const Orders = app.db.models.Orders;
  const Details = app.db.models.Details;
  const Ingredients = app.db.models.Ingredients;

  app
    .route("/orders")
    .get((req, res) => {
      Orders.findAll({
        where: { state: false }, //Indica filtro
        include: [{ model: Details, include: [Ingredients] }], //Incluye primero modelo relacionado a Orders y luego el modelo relacionado a Details
        order: [[Details, Ingredients, "name"]] //Como seran ordenados los datos
      })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    })
    .post((req, res) => {
      Orders.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });
};
