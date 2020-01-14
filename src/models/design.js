module.exports = (sequelize, DataType) => {
    const Design = sequelize.define('Design', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }
    })

    Design.associate = (models) => {
        Design.belongsTo(models.Ingredients);
        Design.belongsTo(models.Pizzas, {onDelete: 'CASCADE'});
    };  
    
    return Design;
};
