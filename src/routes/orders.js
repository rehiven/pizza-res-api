module.exports = app => {
  const Orders = app.db.models.Orders;
  const Details = app.db.models.Details;
  const Ingredients = app.db.models.Ingredients;
  const Pizzas = app.db.models.Pizzas;

  app
    .route("/orders")
    .get((req, res) => {
     Orders.findAll({
     }).then(result=>{
         res.json(result)
     })
     .catch(error=>{
         res.status(412).json({msg: error.message})
     })
    })
    .post((req, res) => {
      Orders.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message });
        });
    });

  app.route("/orderskitchen").get((req, res) => {
    console.log("entro al get allorders");
    Orders.findAll({ where: { state: false },  
        include: [ { model: Details, include: [ Ingredients ] } ],
        order: [ [ Details, Ingredients, 'name' ] ] })
      .then(result => res.json(result))
      .catch(error => {
        res.status(412).json({ msg: error.message });
      });
  });

};
