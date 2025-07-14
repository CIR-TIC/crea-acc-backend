
module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define('RefreshToken', {
        token: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        timestamps: true,
        underscored: true,
        schema: 'app',
    });

    RefreshToken.associate = (models) => {
        RefreshToken.belongsTo(models.User, {
            foreignKey: 'user_id',
            targetKey: 'id',
            onDelete: 'CASCADE',
        });
    };
    return RefreshToken;
};