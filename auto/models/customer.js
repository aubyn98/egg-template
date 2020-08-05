/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('customer', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		customerName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		simpleCode: {
			type: DataTypes.STRING,
			allowNull: false
		},
		liaison: {
			type: DataTypes.STRING,
			allowNull: true
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		fax: {
			type: DataTypes.STRING,
			allowNull: true
		},
		freight: {
			type: DataTypes.STRING,
			allowNull: true
		},
		address: {
			type: DataTypes.STRING,
			allowNull: false
		},
		remark: {
			type: DataTypes.STRING,
			allowNull: true
		},
		lsh: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '((0))'
		}
	}, {
		tableName: 'customer'
	});
};
