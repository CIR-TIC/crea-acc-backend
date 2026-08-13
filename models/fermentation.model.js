module.exports = (sequelize, DataTypes) => {
    const Fermentation = sequelize.define('Fermentation', {
        date: DataTypes.DATE,
        amount: DataTypes.INTEGER,
        unit_measure: DataTypes.STRING,
        days: DataTypes.STRING,
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
        tableName: 'fermentation',
        schema: 'app',
        modelName: 'Fermentation',
        timestamps: false,
    });

    Fermentation.associate = (models) => {
        Fermentation.belongsTo(models.Lot, {
            foreignKey: 'id_lot'
        });
    };

    return Fermentation;
};
