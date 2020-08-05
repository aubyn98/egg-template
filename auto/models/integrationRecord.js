/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('integrationRecord', {
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
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		creator: {
			type: DataTypes.STRING,
			allowNull: true
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
		remark: {
			type: DataTypes.STRING,
			allowNull: true
		},
		date2: {
			type: DataTypes.DATEONLY,
			allowNull: true
		},
		driver: {
			type: DataTypes.STRING,
			allowNull: true
		},
		register: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'integrationRecord'
	});
};
