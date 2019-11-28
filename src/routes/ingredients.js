module.exports = app => {

    const Ingredients = app.db.models.Ingredients;

    app.route('/Ingredients')
        .get((req, res) => {
            Ingredients.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })  
        })
        .post((req, res) => {
            Ingredients.create(req.body)
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
        });
};