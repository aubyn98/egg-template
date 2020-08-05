/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('inventoryRecord', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		kddh: {
			type: DataTypes.STRING,
			allowNull: false
		},
		startStation: {
			type: DataTypes.STRING,
			allowNull: false
		},
		endStation: {
			type: DataTypes.STRING,
			allowNull: false
		},
		carNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		register: {
			type: DataTypes.STRING,
			allowNull: true
		},
		remark: {
			type: DataTypes.STRING,
			allowNull: true
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		date2: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		state: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '((0))'
		},
		driver: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'inventoryRecord'
	});
};
