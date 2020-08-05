/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lsh', {
		lsh: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '((0))'
		},
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		}
	}, {
		tableName: 'lsh'
	});
};
