'use strict'
const {
    Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
     class Response_Option extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Response_Option.belongsTo(models.Option, { foreignKey: 'option_id' }),
            Response_Option.belongsTo(models.Survey, { foreignKey: 'survey_id' })
        }
    };
    Response_Option.init({
        option_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        survey_id: {
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
        modelName: 'Response_Option',
        timestamps: false,
        freezeTableName: true,
        tableName: 'response_option',
    })
    return Response_Option
}