module.exports = (sequelize, DataTypes) => {
    const Harvest = sequelize.define('Harvest', {
        date: DataTypes.DATE,
        unit_measure: DataTypes.STRING,
        product: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        observation: DataTypes.STRING,
        id_lot: DataTypes.INTEGER,
        audCreatedAt: {
            field: 'aud_created_at',
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        },
        audUpdatedAt: {
            field: 'aud_updated_at',
            type: DataTypes.DATE,
        },
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
