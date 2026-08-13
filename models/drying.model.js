module.exports = (sequelize, DataTypes) => {
    const Drying = sequelize.define('Drying', {
        date: DataTypes.DATE,
        amount: DataTypes.INTEGER,
        unit_measure: DataTypes.STRING,
        days: DataTypes.STRING,
        method: DataTypes.STRING,
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
        tableName: 'drying',
        schema: 'app',
        modelName: 'Drying',
        timestamps: false,
    });

    Drying.associate = (models) => {
        Drying.belongsTo(models.Lot, {
            foreignKey: 'id_lot'
        });
    };

    return Drying;
};
