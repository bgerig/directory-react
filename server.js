const express = require('express');
const path = require('path')
const app = express();
const favicon = require('express-favicon');
const publicPath = path.join(__dirname, 'build');
const port = process.env.PORT || 3000;

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(express.static(publicPath));

// Express serve up index.html file if it doesn't recognize route
app.get('/*', function (req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(port, () => {
	console.log('server is running')
})

