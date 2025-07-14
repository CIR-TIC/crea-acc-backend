module.exports = (sequelize, DataTypes) => {
    const Type_Activity = sequelize.define('Type_activity', {
        name: DataTypes.STRING,
        description: DataTypes.STRING
    }, {
        tableName: 'type_activity',
        schema: 'app',
        modelName: 'Type_activity',
        timestamps: false
    });

    Type_Activity.associate = (models) => {
        Type_Activity.hasMany(models.Activity, {
            foreignKey: 'id_type_activity'
        });
    };

    return Type_Activity;
};
