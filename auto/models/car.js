/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('car', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		carType: {
			type: DataTypes.STRING,
			allowNull: false
		},
		carNumber: {
			type: DataTypes.STRING,
			allowNull: false
		},
		register: {
			type: DataTypes.STRING,
			allowNull: false
		},
		company: {
			type: DataTypes.STRING,
			allowNull: false
		},
		driver: {
			type: DataTypes.STRING,
			allowNull: false
		},
		license: {
			type: DataTypes.STRING,
			allowNull: false
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false
		},
		remark: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'car'
	});
};
