module.exports = (sequelize, DataTypes) => {
    const Variety = sequelize.define('Variety', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
    }, {
        tableName: 'variety',
        schema: 'app',
        modelName: 'Variety',
        timestamps: false,
    });

    Variety.associate = (models) => {
        Variety.hasMany(models.Crop, {
            foreignKey: 'id_variety'
        });
    };

    return Variety;
};
