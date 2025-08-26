module.exports = (sequelize, DataTypes) => {
    const Harvest = sequelize.define('Harvest', {
        date: DataTypes.DATE,
        unit_measure: DataTypes.STRING,
        product: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        observation: DataTypes.STRING,
        id_lot: DataTypes.INTEGER,
    }, {
        tableName: 'harvest',
        schema: 'app',
        modelName: 'Harvest',
        timestamps: false,
    });

    Harvest.associate = (models) => {
        Harvest.belongsTo(models.Lot, {
            foreignKey: 'id_lot'
        });
    };

    return Harvest;
};
