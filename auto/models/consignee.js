/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('consignee', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		consignee: {
			type: DataTypes.STRING,
			allowNull: false
		},
		simpleCode: {
			type: DataTypes.STRING,
			allowNull: false
		},
		goodsType: {
			type: DataTypes.STRING,
			allowNull: false
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		insured: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		payment: {
			type: DataTypes.STRING,
			allowNull: false
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		discount: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		freight: {
			type: DataTypes.STRING,
			allowNull: true
		},
		line: {
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
		}
	}, {
		tableName: 'consignee'
	});
};
