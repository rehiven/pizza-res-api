module.exports = (sequelize, DataType) => {
    const Desing = sequelize.define('Desing', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    })

    Desing.associate = (models) => {
        Desing.belongsTo(models.Ingredients);
        Desing.belongsTo(models.Pizzas);
    };  
    
    return Desing;
};
