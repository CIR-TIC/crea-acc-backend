// models/lot.js
module.exports = (sequelize, DataTypes) => {
    const Lot = sequelize.define('Lot', {
        lot_id: DataTypes.STRING,
        area: DataTypes.FLOAT,
        crop_type: DataTypes.STRING,
        age: DataTypes.INTEGER,
        sowing_date: DataTypes.DATE,
        irrigation_system: DataTypes.STRING,
        id_property: DataTypes.INTEGER,
        id_crop: DataTypes.INTEGER
    }, {
        tableName: 'lot',
        schema: 'app',
        modelName: 'Lot',
        timestamps: false
    });

    Lot.associate = (models) => {
        Lot.belongsTo(models.Property, {
            foreignKey: 'id_property'
        });
        Lot.belongsTo(models.Crop, {
            foreignKey: 'id_crop'
        });
        Lot.hasMany(models.Activity, { foreignKey: 'id_lot', as: 'activities' });
        Lot.hasMany(models.Fermentation, { foreignKey: 'id_lot', as: 'fermentations' });
        Lot.hasMany(models.Drying, { foreignKey: 'id_lot', as: 'dryings' });
        Lot.hasMany(models.Sale, { foreignKey: 'id_lot', as: 'sales' });
    };

    return Lot;
};
