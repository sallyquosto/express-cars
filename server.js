// after we create our folder and server.js and routes.js we set up express
const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json());
app.use('/', routes);

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port: ${port}.`)
});