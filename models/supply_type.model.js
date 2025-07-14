// models/supply_type.js
module.exports = (sequelize, DataTypes) => {
    const Supply_Type = sequelize.define('Supply_Type', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {
        tableName: 'supply_type',
        schema: 'app',
        modelName: 'Supply_type',
        timestamps: false,
    });

    Supply_Type.associate = (models) => {
        Supply_Type.hasMany(models.Supplies, {
            foreignKey: 'id_supply_type'
        });
    };

    return Supply_Type;
};
