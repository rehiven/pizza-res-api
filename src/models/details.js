module.exports = (sequelize, DataType) => {
    const Details = sequelize.define('Details', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        price: {
            type: DataType.DOUBLE,
            allowNull: false,
        },
        sum: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }

    })

    Details.associate = (models) => {
        Details.belongsTo(models.Orders);
        Details.belongsTo(models.Ingredients);
        Details.belongsTo(models.Pizzas);
    };

    return Details;
};
