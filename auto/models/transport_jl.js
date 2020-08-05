/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('transport_jl', {
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
		goods: {
			type: DataTypes.STRING,
			allowNull: false
		},
		unit: {
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
		unfigure: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
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
		otherPrice: {
			type: DataTypes.FLOAT,
			allowNull: false,
			defaultValue: '((0))'
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
		id2: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'transportRecord',
				key: 'id'
			}
		}
	}, {
		tableName: 'transport_jl'
	});
};
