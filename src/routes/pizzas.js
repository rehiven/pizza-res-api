module.exports = app => {

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
            
            let Pizzass = {
                title : req.body.obj.title,
                description : req.body.obj.description,
                UserId : req.body.obj.UserId
            }
            let Desings = []

            let Orderss ={
                state: 0,
                total: req.body.amount,
                UserId: req.body.obj.UserId
            }

            let Detailss = [];
            

            Pizzas.create(Pizzass)
            .then(result => {
                console.log("cantidad de ingredientes "+req.body.pizza.mainIngredients.length);
                for(let i = 0; i<req.body.pizza.mainIngredients.length;i++){
                    
                    Desings.push({IngredienteId: req.body.pizza.mainIngredients[i].id, PizzaId: result.dataValues.id})
                }
               console.log("disings objet"+Desings+" ****///*********");

                return Desing.bulkCreate(Desings).then(desingR=>{
                    return Orders.create(Orderss).then(ordersR=>{
                        console.log()
                        for(let i = 0; i<req.body.pizza.mainIngredients.length;i++){
                            Detailss.push({price: req.body.pizza.mainIngredients[i].price,sum: req.body.pizza.mainIngredients[i].quantity ,OrderId: ordersR.dataValues.id,IngredienteId: req.body.pizza.mainIngredients[i].id})
                        }
                        console.log("Objeto detail"+Detailss+" ****///*********");

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

        app.get('/pizza/:id', (req, res) => {
            console.log("entrando a ver pizzas");
            Pizzas.findAll({
                where: {UserId: req.params.id}
            }).then(result => (res.json(result)))
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