module.exports = (sequelize, DataTypes) => {
    const Sale = sequelize.define('Sale', {
        date: DataTypes.DATE,
        unit_measure: DataTypes.STRING,
        quantity: DataTypes.INTEGER,
        income: DataTypes.INTEGER,
        destination: DataTypes.STRING,
        description: DataTypes.STRING,
        transportation_type: DataTypes.STRING,
        observation: DataTypes.STRING,
        cacao_state: DataTypes.STRING,
        id_lot: DataTypes.INTEGER,
        audCreatedAt: {
            field: 'aud_created_at',
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
        },
        audUpdatedAt: {
            field: 'aud_updated_at',
            type: DataTypes.DATE,
        }
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
