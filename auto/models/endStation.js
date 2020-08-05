/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('endStation', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		endStation: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'endStation'
	});
};
