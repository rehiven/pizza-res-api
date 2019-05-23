module.exports = (sequelize, DataType) => {
    const Pizzas = sequelize.define('Pizzas', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }

    })

    Pizzas.associate = (models) => {
        Pizzas.belongsTo(models.Users);
    };

    Pizzas.associate = (models) => {
        Pizzas.hasMany(models.Desing);
    };
    return Pizzas;
};
