import express from 'express';

module.exports = app => {
    //settings
    app.set('port', process.env.PORT || 3000);

    //middlewares   ---Estos procesan los datos que vienen de los clientes

    app.use(express.json());
}