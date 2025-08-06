'use strict'
const {
    Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Property extends Model {
        static associate(models) {
            Property.hasMany(models.User, {
                foreignKey: 'property_id',
            });
        }
    };
    Property.init({
        province: { type: DataTypes.STRING },
        canton: { type: DataTypes.STRING },
        parish: { type: DataTypes.STRING },
        community: { type: DataTypes.STRING },
        coordinates_x: { type: DataTypes.FLOAT },
        coordinates_y: { type: DataTypes.FLOAT },
        audCreatedAt: {
            field: 'aud_created_at',
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('now'),
            allowNull: false
        },
        audUpdatedAt: {
            field: 'aud_updated_at',
            type: DataTypes.DATE,
        },
        audDeletedAt: {
            field: 'aud_deleted_at',
            type: DataTypes.DATE
        },
    }, {
        sequelize,
        schema: 'app',
        modelName: 'Property',
        timestamps: false,
        freezeTableName: true,
        tableName: 'property',
    })

    return Property
}