module.exports = (sequelize, DataTypes) => {
    const Crop = sequelize.define('Crop', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {
        tableName: 'crop',
        schema: 'app',
        modelName: 'Crop',
        timestamps: false,
    });

    Crop.associate = (models) => {
        Crop.hasMany(models.Variety, {
            foreignKey: 'id_crop'
        });
    };

    return Crop;
};
