'use strict'
const {
    Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Association extends Model { };
    Association.init({
        name: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
        code: { type: DataTypes.STRING, unique: true },
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
        modelName: 'Association',
        timestamps: false,
        freezeTableName: true,
        tableName: 'association',
    })
    return Association
}