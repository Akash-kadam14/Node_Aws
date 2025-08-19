require('dotenv').config();
const { getSecrets } = require('./config/env.config');

getSecrets().then(()=> {
    const express = require('express');
    const port = 8000;
    const app = express();

    app.listen(port, ()=> {
        console.log(`server started on port ${port}✈️`);
    })
})