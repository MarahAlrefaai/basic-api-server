'use strict'

require('dotenv').config();

const server =require('./src/server.js');
const {db} = require('./src/models/index.js')

//dont start until the postgres is working 
    db.sync().then(()=>{
      server.start(process.env.PORT || 3009);//if .env.port dedn't work will take 3000 port

    })
