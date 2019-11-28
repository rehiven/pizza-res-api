module.exports = app => {

    const Orders = app.db.models.Orders;
    const Pizzas = app.db.models.Pizzas;

    app.route('/orders')
        .get((req, res) => {
            let vector = [];
            Orders.findAll({
                where: { state: req.params.id }
            }).then(result => {
                return Pizzas.findAll({
                    where: { state: req.params.id }
                }).then(restulp => {

                })
            })
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
        .post((req, res) => {
            Orders.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });

};