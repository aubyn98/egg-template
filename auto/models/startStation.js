/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('startStation', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		startStation: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'startStation'
	});
};
