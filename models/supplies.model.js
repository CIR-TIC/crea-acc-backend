// models/supplies.js
module.exports = (sequelize, DataTypes) => {
    const Supplies = sequelize.define('Supplies', {
        date: DataTypes.DATE,
        description: DataTypes.STRING,
        amount: DataTypes.FLOAT,
        unit_measure: DataTypes.STRING,
        cost: DataTypes.FLOAT,
        observation: DataTypes.STRING,
        id_supply_type: DataTypes.INTEGER
    }, {
        tableName: 'supplies',
        schema: 'app',
        modelName: 'Supplies',
        timestamps: false
    });

    Supplies.associate = (models) => {
        Supplies.belongsTo(models.Supply_Type, {
            foreignKey: 'id_supply_type'
        });
    };

    return Supplies;
};
