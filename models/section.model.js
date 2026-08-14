'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Section extends Model {
        static associate(models) {
            Section.belongsTo(models.Form, {
                foreignKey: 'form_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
            // Sin cascada: si se borra una Section, sus preguntas no
            // desaparecen con ella — solo se quedan sin sección (ver
            // Question.belongsTo(Section) en question.model.js).
            Section.hasMany(models.Question, {
                foreignKey: 'section_id',
                as: 'questions',
            })
        };
    };
    Section.init({
        title: { type: DataTypes.STRING, allowNull: false },
        index: { type: DataTypes.INTEGER, allowNull: false },
        form_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
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
        modelName: 'Section',
        timestamps: false,
        freezeTableName: true,
        tableName: 'section',
        indexes: [
            { unique: true, fields: ['form_id', 'index'] },
        ],
    })
    return Section
}
