'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
     class Response extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Sin cascada: si se borra una Question, sus respuestas ya dadas
            // se quedan (dato de auditoría), el borrado se bloquea hasta que
            // se limpien a propósito.
            Response.belongsTo(models.Question, { foreignKey: 'question_id', onDelete: 'RESTRICT' }),
            Response.belongsTo(models.Survey_Submission, { foreignKey: 'survey_submission_id' }),
            // Si se borra la Option elegida, la respuesta no desaparece —
            // solo pierde la referencia a cuál opción era (option_id a null).
            Response.belongsTo(models.Option, { foreignKey: 'option_id', onDelete: 'SET NULL' })
            Response.hasMany(models.Response_Selected_Option, {
                foreignKey: 'response_id',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            })
        }
    };
    Response.init({
        text_value: {type: DataTypes.TEXT},
        question_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        survey_submission_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        option_id: {
            type: DataTypes.INTEGER,
            allowNull: true
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
        modelName: 'Response',
        timestamps: false,
        freezeTableName: true,
        tableName: 'response',
        // Una sola respuesta por pregunta por envío.
        indexes: [
            { unique: true, fields: ['survey_submission_id', 'question_id'] },
        ],
    })
    return Response
}