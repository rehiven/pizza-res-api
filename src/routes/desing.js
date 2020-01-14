module.exports = app => {
    const Design = app.db.models.Design;
    const Ingredients = app.db.models.Ingredients;

    //* Nota agregar json web tokens - BCRYPT para cifrar datos  */
    

    app.route('/design/:id')
        .get((req, res) => {
            Design.findAll({})
            .then(result => res.json(result))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            })  
        })
        .post((req, res) => {
            console.log(req);
            Design.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });

    app.post('/design', (req, res) => {
        Design.create(req.body)
            .then(result => (res.json(result)))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });

    app.delete('/design/:id', (req, res) => {
        Design.destroy({ where: { pizzaId: req.params.pizzaId } })
            .then(result => res.sendStatus(204))
            .catch(error => {
                res.status(412).json({ msg: error.message });
            });
    });
}