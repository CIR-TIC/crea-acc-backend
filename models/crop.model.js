module.exports = (sequelize, DataTypes) => {
    const Crop = sequelize.define('Crop', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        id_variety: DataTypes.INTEGER,
    }, {
        tableName: 'crop',
        schema: 'app',
        modelName: 'Crop',
        timestamps: false,
    });

    Crop.associate = (models) => {
        Crop.belongsTo(models.Variety, {
            foreignKey: 'id_variety'
        });

        Crop.hasMany(models.Lot, {
            foreignKey: 'id_crop'
        });
    };

    return Crop;
};
