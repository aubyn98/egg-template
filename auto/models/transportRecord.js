/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('transportRecord', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		dh: {
			type: DataTypes.STRING,
			allowNull: false
		},
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		lsh: {
			type: DataTypes.STRING,
			allowNull: false
		},
		creator: {
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
		consignee: {
			type: DataTypes.STRING,
			allowNull: false
		},
		consigneePhone: {
			type: DataTypes.STRING,
			allowNull: false
		},
		consigneeAddress: {
			type: DataTypes.STRING,
			allowNull: false
		},
		customerName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		customerPhone: {
			type: DataTypes.STRING,
			allowNull: true
		},
		customerAddress: {
			type: DataTypes.STRING,
			allowNull: true
		},
		remark: {
			type: DataTypes.STRING,
			allowNull: true
		},
		imaginaryPiece: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		imaginaryPercent: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		payment: {
			type: DataTypes.STRING,
			allowNull: false
		},
		insured: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		insuredSum: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		insuredRatio: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		collection: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		sum: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		position: {
			type: DataTypes.STRING,
			allowNull: true
		}
	}, {
		tableName: 'transportRecord'
	});
};
