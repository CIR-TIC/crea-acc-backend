module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
        date: DataTypes.DATE,
        unit_measure: DataTypes.STRING,
        income: DataTypes.INTEGER,
        destination: DataTypes.STRING,
        description: DataTypes.STRING,
        transportation_type: DataTypes.STRING,
        observation: DataTypes.STRING,
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
