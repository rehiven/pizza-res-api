module.exports = (sequelize, DataType) => {
    const Desing = sequelize.define('Desing', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ingredientId: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        typeIngredient: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }

    })

    Desing.associate = (models) => {
        Desing.belongsTo(models.Pizzas);
    }
    return Desing;
};
