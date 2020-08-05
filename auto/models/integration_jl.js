/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('integration_jl', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		kddh: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: 'integrationRecord',
				key: 'kddh'
			}
		},
		dh: {
			type: DataTypes.STRING,
			allowNull: false
		},
		date: {
			type: DataTypes.DATEONLY,
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
		customerName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		customerAddress: {
			type: DataTypes.STRING,
			allowNull: false
		},
		consignee: {
			type: DataTypes.STRING,
			allowNull: false
		},
		consigneeAddress: {
			type: DataTypes.STRING,
			allowNull: false
		},
		payment: {
			type: DataTypes.STRING,
			allowNull: false
		},
		goods: {
			type: DataTypes.STRING,
			allowNull: false
		},
		num: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		quantity: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		collection: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
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
		money: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
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
		otherPrice: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		discount: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		transferFee: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		deliveryFee: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		sum: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		state: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '((0))'
		},
		remark: {
			type: DataTypes.STRING,
			allowNull: true
		},
		jlid: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		id2: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'integration_jl'
	});
};
