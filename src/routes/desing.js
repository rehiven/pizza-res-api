module.exports = app => {
    const Desing = app.db.models.Desing;

    //* Nota agregar json web tokens - BCRYPT para cifrar datos  */
    
    app.route('/desing')
        .get((req, res) => {
            Desing.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })  
        })
        .post((req, res) => {
            Desing.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });

    app.post('/desing', (req, res) => {
        Desing.create(req.body)
            .then(result => (res.json(result)))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });

    app.delete('/desing/:id', (req, res) => {
        Desing.destroy({ where: { pizzaId: req.params.pizzaId } })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });
}