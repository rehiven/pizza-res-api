module.exports = app => {
    const Details = app.db.models.Details;
    //* Nota agregar json web tokens - BCRYPT para cifrar datos  */
    

    app.route('/detail/:id')
        .get((req, res) => {
            Details.findAll({})
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            })  
        })
        .post((req, res) => {
            console.log(req);
            Details.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });

    app.post('/detail', (req, res) => {
        Details.create(req.body)
            .then(result => (res.json(result)))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });

    app.delete('/detail/:id', (req, res) => {
        Details.destroy({ where: { pizzaId: req.params.pizzaId } })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });
}