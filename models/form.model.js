'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Form extends Model { };
    Form.associate = (models) => {
        Form.hasMany(models.Question, {
            foreignKey: 'form_id',
            as: 'questions'
        });
    };
    Form.init({
        title: { type: DataTypes.STRING },
        description: { type: DataTypes.STRING },
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
        schema: 'form',
        modelName: 'Form',
        timestamps: false,
        freezeTableName: true,
        tableName: 'form',
    })
    return Form
}