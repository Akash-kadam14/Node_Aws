require('dotenv').config();
const { getSecrets } = require('./config/env.config');

getSecrets().then(()=> {
    console.log(process.env);
    const express = require('express');
    const port = 8000;
    const app = express();
    const bodyParser = require('body-parser');
    const isAuthenticate = require('./middlewares/authenticate');
    const awsRoutes = require('./routes/routes');

    app.use(bodyParser.urlencoded({ extended: true, limit: '20mb'}));
    app.use(bodyParser.json({ limit: '20mb'}));

    app.use(isAuthenticate);
    app.use('/api/aws/', awsRoutes);
    app.listen(port, ()=> {
        console.log(`server started on port ${port}✈️`);
    })
})