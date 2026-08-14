'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Survey_Submission extends Model {
        static associate(models) {
            // No CASCADE aquí a propósito: un envío de encuesta es dato de
            // auditoría real, no catálogo. Borrar una Form nunca debería
            // arrastrar en silencio los envíos históricos que dependen de
            // ella — mejor que la base rechace ese borrado (comportamiento
            // por defecto, NO ACTION) hasta que alguien lo haga a propósito.
            Survey_Submission.belongsTo(models.Form, { foreignKey: 'form_id' })
            // En cambio, borrar UN envío específico sí debe llevarse sus
            // propias respuestas: no tienen ningún valor huérfanas.
            Survey_Submission.hasMany(models.Response, {
                foreignKey: 'survey_submission_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        }
    };
    Survey_Submission.init({
        submission_code: { type: DataTypes.STRING, unique: true },
        date: { type: DataTypes.DATE },
        pollster_id: { type: DataTypes.INTEGER },
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
        modelName: 'Survey_Submission',
        timestamps: false,
        freezeTableName: true,
        tableName: 'survey_submission',
    })
    return Survey_Submission
}