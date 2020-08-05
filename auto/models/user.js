/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('user', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		userName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		position: {
			type: DataTypes.STRING,
			allowNull: false
		},
		remark: {
			type: DataTypes.STRING,
			allowNull: true
		},
		auth: {
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue: 'all'
		},
		administrator: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'user'
	});
};
