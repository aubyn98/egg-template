/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('inventory_jl', {
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
				model: 'inventoryRecord',
				key: 'kddh'
			}
		},
		customerName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		consignee: {
			type: DataTypes.STRING,
			allowNull: false
		},
		dh: {
			type: DataTypes.STRING,
			allowNull: false
		},
		kddh2: {
			type: DataTypes.STRING,
			allowNull: false
		},
		endStation: {
			type: DataTypes.STRING,
			allowNull: false
		},
		consigneeAddress: {
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
		insured: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		otherPrice: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		payee: {
			type: DataTypes.STRING,
			allowNull: true
		},
		receipts: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
		},
		kddhdate: {
			type: DataTypes.DATEONLY,
			allowNull: false
		},
		sum: {
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
		payment: {
			type: DataTypes.STRING,
			allowNull: false
		},
		remark: {
			type: DataTypes.STRING,
			allowNull: true
		},
		state: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '((0))'
		},
		jlid: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		payeeDate: {
			type: DataTypes.STRING,
			allowNull: false
		},
		id2: {
			type: DataTypes.INTEGER,
			allowNull: true
		}
	}, {
		tableName: 'inventory_jl'
	});
};
