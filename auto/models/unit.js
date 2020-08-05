/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('unit', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		unit: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'unit'
	});
};
