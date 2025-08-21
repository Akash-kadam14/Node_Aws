require('dotenv').config();
const { getSecrets } = require('./config/env.config');

getSecrets().then(()=> {
    console.log(process.env);
    const express = require('express');
    const mongoose = require('mongoose');
    const port = 8000;
    const app = express();
    const bodyParser = require('body-parser');
    const awsRoutes = require('./routes/routes');

    mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.databaseName}`).then (()=> {
    
    app.use(bodyParser.urlencoded({ extended: true, limit: '20mb'}));
    app.use(bodyParser.json({ limit: '20mb'}));

    app.use('/api/aws/', awsRoutes);

    app.listen(port, ()=> {
        console.log(`server started on port ${port}✈️`);
    })
    }).catch((err)=> {
        console.error('error connecting mongoose', err.message);
        console.error('server closed');
    })

    mongoose.connection.on('connected', ()=> {
        console.log('connected to database');
    });

    mongoose.connection.on('error', (err)=> {
        console.error('Database Error', err.message);
    })
})