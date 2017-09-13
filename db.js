const Sequelize = require('sequelize');
let sequelize = new Sequelize(process.env.DATABASE_URL || '//postgres://postgres:9074dewberry1136@localhost:5432/workoutlog',{
	dialect: 'postgres'
});

// let sequelize = new Sequelize('workoutlog','postgres','9074dewberry1136',{
// 	host: 'localhost',
// 	dialect: 'postgres'
// });

sequelize.authenticate().then(
	function(){
		console.log('connected to workoutlog postgres db');
	},
	function(err){
		console.log(err);
	}
);

let User = sequelize.import('./models/user.js');
module.exports = sequelize;