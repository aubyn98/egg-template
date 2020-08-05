/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('goods', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		goods: {
			type: DataTypes.STRING,
			allowNull: false
		},
		unit: {
			type: DataTypes.STRING,
			allowNull: true
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		remark: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'goods'
	});
};
