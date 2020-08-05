/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('baseMsg', {
		corporateName: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		englishName: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		contacts: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		mobilePhone: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		fax: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		website: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		mailbox: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		address: {
			type: DataTypes.STRING,
			allowNull: true,
			defaultValue: ''
		},
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		}
	}, {
		tableName: 'baseMsg'
	});
};
