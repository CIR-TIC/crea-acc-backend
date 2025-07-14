module.exports = (sequelize, DataTypes) => {
    const Fermentation = sequelize.define('Fermentation', {
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        observations: DataTypes.STRING,
        id_lot: DataTypes.INTEGER,
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
