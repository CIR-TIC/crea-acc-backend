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
            Response.belongsTo(models.Question, { foreignKey: 'question_id' }),
            Response.belongsTo(models.Survey_Submission, { foreignKey: 'survey_submission_id' }),
            Response.belongsTo(models.Option, { foreignKey: 'option_id' })
            Response.hasMany(models.Response_Selected_Option, {foreignKey: 'response_id' })
        }
    };
    Response.init({
        text_value: {type: DataTypes.STRING},
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
    })
    return Response
}