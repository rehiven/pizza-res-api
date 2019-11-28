module.exports = (sequelize, DataType) => {
    const Orders = sequelize.define('Orders', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        state: {
            type: DataType.BOOLEAN,
            allowNull: false,
            defaultValue: 1,
        },
        total:{
            type: DataType.DOUBLE,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        }

    })

    Orders.associate = (models) => {
        Orders.belongsTo(models.Users);
        Orders.hasMany(models.Details);
    };

    return Orders;
};
