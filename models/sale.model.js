module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
        date: DataTypes.DATE,
        quantity: DataTypes.FLOAT,
        unit: DataTypes.STRING,
        price_per_unit: DataTypes.FLOAT,
        total: DataTypes.FLOAT,
        buyer: DataTypes.STRING,
        notes: DataTypes.STRING,
        id_lot: DataTypes.INTEGER
    }, {
        tableName: 'sale',
        schema: 'app',
        modelName: 'Sale',
        timestamps: false
    });

    Sale.associate = (models) => {
        Sale.belongsTo(models.Lot, {
            foreignKey: 'id_lot'
        });
    };

    return Sale;
};
