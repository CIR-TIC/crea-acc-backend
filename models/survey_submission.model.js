'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
    class Survey_Submission extends Model {
        static associate(models) {
            Survey_Submission.belongsTo(models.Form, { foreignKey: 'form_id' })
            Survey_Submission.hasMany(models.Response, {foreignKey: 'survey_submission_id',} )
        }
    };
    Survey_Submission.init({
        submission_code: { type: DataTypes.STRING },
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