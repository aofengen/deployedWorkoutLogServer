require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const sequelize = require('./db.js');
const User = sequelize.import(__dirname + '\/models\/user.js');
const Define = sequelize.import(__dirname + '\/models\/definition.js');
const Log = sequelize.import(__dirname + '\/models\/log.js');


/* THIS WILL DROP EACH INDIVIDUAL TABLE!!! WARNING!!!
User.sync({force: true}); 
Define.sync({force: true});
Log.sync({force: true});

sequelize.sync({force: true}) - will drop ALL tables at once

Rebuild Tables
User.sync();
Define.sync();
Log.sync();
*/

sequelize.sync();
app.use(bodyParser.json());
app.use(require('./middleware/headers'));
app.use(require('./middleware/validate-session.js'));
app.use('/api/user', require('./routes/user.js'));
app.use('/api/login', require('./routes/session.js'));
app.use('/api/definition', require('./routes/definition.js'));
app.use('/api/log', require('./routes/log.js'))

app.use('/api/test', function(req,res){
	res.send('Hello World');
});

http.listen(process.env.PORT || 3000, function(){
	console.log("Listening on port 3000");
});