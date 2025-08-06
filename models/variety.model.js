module.exports = (sequelize, DataTypes) => {
    const Variety = sequelize.define('Variety', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        id_crop: DataTypes.INTEGER,
    }, {
        tableName: 'variety',
        schema: 'app',
        modelName: 'Variety',
        timestamps: false,
    });

    Variety.associate = (models) => {
        Variety.belongsTo(models.Crop, {
            foreignKey: 'id_crop'
        });
        Variety.hasMany(models.Lot, {
            foreignKey: 'id_variety'
        });
    };

    return Variety;
};
