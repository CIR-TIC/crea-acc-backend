module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('Activity', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        start_date: DataTypes.DATE,
        end_date: DataTypes.DATE,
        responsible: DataTypes.STRING,
        status: DataTypes.STRING,
        id_lot: DataTypes.INTEGER
    }, {
        tableName: 'activity',
        schema: 'app',
        modelName: 'Activity',
        timestamps: false
    });

    Activity.associate = (models) => {
        Activity.belongsTo(models.Lot, {
            foreignKey: 'id_lot'
        }),
        Activity.belongsTo(models.Type_activity, {
            foreignKey: 'id_type_activity'
        });;
    };

    return Activity;
};
