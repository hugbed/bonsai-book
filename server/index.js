const express = require('express');
const bodyParser = require('body-parser')
const mountRoutes = require('./routes');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
mountRoutes(app);

app.listen(3100, () => {
	console.log('listening on 3100');
});
