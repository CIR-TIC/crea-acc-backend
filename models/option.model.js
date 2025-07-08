'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
     class Option extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Option.belongsTo(models.Form, { foreignKey: 'question_id' })
        }
    };
    Option.init({
        value: {type: DataTypes.STRING},
        index: {type: DataTypes.INTEGER},
        question_id: {
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
        modelName: 'Option',
        timestamps: false,
        freezeTableName: true,
        tableName: 'option',
    })
    return Option
}