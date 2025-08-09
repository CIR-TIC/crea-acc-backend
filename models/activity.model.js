module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define('Activity', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        date: DataTypes.DATE,
        equipment: DataTypes.STRING,
        dose: DataTypes.STRING,
        labour_amount: DataTypes.FLOAT,
        labour_cost: DataTypes.FLOAT,
        observation: DataTypes.STRING,
        status: DataTypes.STRING,
        id_lot: DataTypes.INTEGER,
        id_type_activity: DataTypes.INTEGER
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
