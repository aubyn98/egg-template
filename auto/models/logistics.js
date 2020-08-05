/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('logistics', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		position: {
			type: DataTypes.STRING,
			allowNull: false
		},
		time: {
			type: DataTypes.DATE,
			allowNull: false
		},
		bm: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: 'logistics'
	});
};
