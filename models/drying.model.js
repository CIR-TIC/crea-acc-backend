module.exports = (sequelize, DataTypes) => {
    const Drying = sequelize.define('Drying', {
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        method: DataTypes.STRING,
        observations: DataTypes.STRING,
        id_lot: DataTypes.INTEGER,
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
