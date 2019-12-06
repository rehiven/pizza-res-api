module.exports = app => {

    //Estos son los modelos que se van a ocupar para luego manipular las tablas de la base de datos
    const Pizzas = app.db.models.Pizzas;
    const Desing = app.db.models.Desing;
    const Details = app.db.models.Details;
    const Orders = app.db.models.Orders;

    app.route('/pizzas')
        .get((req, res) => {
            Pizzas.findAll({})
                .then(result => res.json(result))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })  
        })
        .post((req, res) => {
            //Creo los objetos que voy a guardar luego
            let Pizzass = {
                title : req.body.obj.title,
                description : req.body.obj.description,
                UserId : req.body.obj.UserId
            }
            //este es el desing de cada pizza, contiene todos los ingredientes que lleva
            let Desings = []

            //este es la orden de que se realiza
            let Orderss ={
                state: 0,
                total: req.body.amount,
                UserId: req.body.obj.UserId
            }

            let Detailss = [];
            
            Pizzas.create(Pizzass)//Primero Inserto la Pizza
            .then(result => {
                req.body.pizza.mainIngredients.forEach(element => {
                    Desings.push({IngredientId: element.id, PizzaId: result.dataValues.id})
                });
                //Segundo se inserta el Desing que contiene todos los ingredientes que lleva la pizza
                return Desing.bulkCreate(Desings).then(desingR=>{
                    //Tercero se inserta la orden que se necesita para la cocina
                    return Orders.create(Orderss).then(ordersR=>{
                        req.body.pizza.mainIngredients.forEach(element => { //recorre los ingredientes para agregar en detalles la suma de todos los ingredientes usados
                            Detailss.push({price: element.price,sum: element.quantity ,OrderId: ordersR.dataValues.id,IngredientId: element.id, PizzaId: result.dataValues.id})
                        })
                        return Details.bulkCreate(Detailss).then(detailR=>{
                            res.json(result);
                        }) 
                    }) 
                })
                  
            })
            .catch(error=>{
                console.log(error);
                res.status(412).json({msg: error.message});
                
            })
        });

        app.route('/pizzass')
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

        app.get('/pizza', (req, res) => {
            console.log("entrando a ver pizzas: "+ req.body.id);
            Pizzas.findAll({
                where: {UserId: req.body.id},
                include: Desing
            }).then(result => (res.json(result)))
                .then()
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        });

   /* app.route('/pizzas/:id')
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
        })*/
};