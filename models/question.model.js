'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
     class Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Question.belongsTo(models.Form, { foreignKey: 'form_id' })
        }
    };
    Question.init({
        label: {type: DataTypes.STRING},
        input_type: {type: DataTypes.STRING},
        question_type: {type: DataTypes.ENUM('text', 'select_one', 'select_multiple'),},
        index: {type: DataTypes.INTEGER},
        is_required: {type: DataTypes.BOOLEAN},
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
        modelName: 'Question',
        timestamps: false,
        freezeTableName: true,
        tableName: 'question',
    })
    return Question
}