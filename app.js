const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Listening..')
});

app.listen(process.env.port || 4002);
console.log('Listening on port: ' + (process.env.port || 4002));