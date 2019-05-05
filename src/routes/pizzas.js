module.exports = app => {

    const Pizzas = app.db.models.Pizzas;

    app.route('/pizzas')
        .get((req, res) => {
            Pizzas.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
        .post((req, res) => {
            Pizzas.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });

    app.route('/pizzas/:id')
        .get((req, res) => {
            Pizzas.findOne({ where: req.params })
                .then(result => (res.json(result)))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
        .put((req, res) => {
            Pizzas.update(req.body, { where: req.params })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
        .delete((req, res) => {
            Pizzas.destroy({ where: req.params })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        })
};