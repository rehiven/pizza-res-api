module.exports = (sequelize, DataType) => {
    const Ingredients = sequelize.define('Ingredients', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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
        },
        price: {
            type: DataType.DOUBLE,
            allowNull: true,
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

    Ingredients.associate = (models) => {
        Ingredients.hasMany(models.Design);
        Ingredients.hasMany(models.Details);
    };

    return Ingredients;
};
