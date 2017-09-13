module.exports = function(sequelize, DataTypes) {
	return sequelize.define('log', {
		date: DataTypes.STRING,
		desc: DataTypes.STRING,
		result: DataTypes.STRING,
		owner: DataTypes.INTEGER,
		def: DataTypes.STRING,
		int: DataTypes.INTEGER
	},{
	});
}