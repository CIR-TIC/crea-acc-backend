'use strict'
const {
    Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Association, { foreignKey: 'association_id' })
            User.belongsTo(models.Property, { foreignKey: 'property_id' })
        }
    };
    User.init({
        identity_number: { type: DataTypes.STRING, unique: true },
        producer_code: { type: DataTypes.STRING, unique: true },
        name: { type: DataTypes.STRING },
        last_name: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING, unique: true },
        password: { type: DataTypes.STRING },
        birthday: { type: DataTypes.STRING },
        role: { type: DataTypes.ENUM('pollster', 'producer'), },
        association_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        property_id: {
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
        schema: 'app',
        modelName: 'User',
        timestamps: false,
        freezeTableName: true,
        tableName: 'user',
    })
    return User
}