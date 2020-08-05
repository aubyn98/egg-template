/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('auth', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		auth: {
			type: DataTypes.STRING,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'auth'
	});
};
