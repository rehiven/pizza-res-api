module.exports = app => {

    //Estos son los modelos que se van a ocupar para luego manipular las tablas de la base de datos
    const Pizzas = app.db.models.Pizzas;
    const Design = app.db.models.Design;
    const Details = app.db.models.Details;
    const Orders = app.db.models.Orders;
    const Ingredients = app.db.models.Ingredients;

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
            console.log("IdUser :"+req.body.obj.UserId);
            let idUserDefault = 0;
            if(!req.body.obj.UserId){
                idUserDefault=1;
            }else{
                idUserDefault = req.body.obj.UserId;
            }
            let Pizzass = {
                title : req.body.obj.title,
                description : req.body.obj.description,
                UserId : idUserDefault
            }
            //este es el desing de cada pizza, contiene todos los ingredientes que lleva
            let Designs = []

            //este es la orden de que se realiza
            let Orderss ={
                state: 0,
                total: req.body.amount,
                UserId: idUserDefault
            }

            let Detailss = [];
            
            Pizzas.create(Pizzass)//Primero Inserto la Pizza
            .then(result => {
                req.body.pizza.mainIngredients.forEach(element => {
                    Designs.push({IngredientId: element.id, PizzaId: result.dataValues.id})
                });
                //Segundo se inserta el Desing que contiene todos los ingredientes que lleva la pizza
                return Design.bulkCreate(Designs).then(desingR=>{
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

        app.route('/pizza/:id') 
        .get((req, res) => {
            console.log("entrando a ver pizzas: "+ req.params.id);
            Pizzas.findAll({
                where: {UserId: req.params.id},
                include: [{ model: Design, include: [Ingredients] }]
            }).then(result => (
                res.json(result)
                ))
                .then()
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                });
        }).delete((req, res) => {
            console.log("Entrando a delete: "+req.params.id);
            Pizzas.destroy({ 
                where: {id: req.params.id},
                include: Design
            })
                .then(result => res.sendStatus(204))
                .catch(error => {
                    res.status(412).json({ msg: error.message });
                })
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