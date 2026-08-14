'use strict'
const {
    Model
} = require('sequelize')

// Tipos válidos hoy en el flujo real (seed + render del cuestionario en la
// app móvil, app/(survey)/survey/[surveyId].tsx). No hay migraciones en este
// proyecto (el esquema se crea con sequelize.sync()), así que esto se aplica
// como validación de Sequelize en cada create/update en vez de un CHECK de
// Postgres: es más fácil de ampliar el día que se agregue un tipo nuevo.
const VALID_INPUT_TYPES = ['text', 'textbox', 'number', 'date', 'select', 'radio', 'checkbox', 'likert_scale', 'note'];
const VALID_QUESTION_TYPES = ['short_answer', 'long_answer', 'boolean', 'single_choice', 'likert_scale', 'observation'];

module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Question.belongsTo(models.Form, { foreignKey: 'form_id' })
            // Sin cascada: borrar la Section no debe borrar sus preguntas,
            // solo dejarlas sin sección (ver Section.hasMany(Question)).
            Question.belongsTo(models.Section, {
                foreignKey: 'section_id',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
            // Las opciones son catálogo, no datos de auditoría: borrar una
            // pregunta se lleva sus opciones consigo.
            Question.hasMany(models.Option, {
                foreignKey: 'question_id',
                as: 'options',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            });
        };
    };
    Question.init({
        label: { type: DataTypes.TEXT },
        // Texto de apoyo/contexto para responder esta pregunta (p. ej. "qué
        // documento pedir para verificarla"). Antes vivía como una pregunta
        // 'note' aparte justo después de la pregunta real; ahora es un campo
        // de la pregunta a la que realmente pertenece.
        help_text: { type: DataTypes.TEXT, allowNull: true },
        input_type: {
            type: DataTypes.STRING,
            validate: { isIn: [VALID_INPUT_TYPES] },
        },
        question_type: {
            type: DataTypes.STRING,
            validate: { isIn: [VALID_QUESTION_TYPES] },
        },
        index: { type: DataTypes.INTEGER },
        is_required: { type: DataTypes.BOOLEAN },
        // Límites opcionales para preguntas input_type='number' (p. ej. un
        // porcentaje entre 0 y 100). NULL = sin límite en ese extremo.
        min_value: { type: DataTypes.DECIMAL, allowNull: true },
        max_value: { type: DataTypes.DECIMAL, allowNull: true },
        form_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        // Nullable: preguntas fuera de cualquier sección (p. ej. el párrafo
        // introductorio del cuestionario) se quedan con section_id NULL.
        section_id: {
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
        modelName: 'Question',
        timestamps: false,
        freezeTableName: true,
        tableName: 'question',
    })
    return Question
}