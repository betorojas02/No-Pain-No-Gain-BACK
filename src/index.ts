import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
var cors = require('cors');
// import  * as cors from 'cors';
import * as helmet from 'helmet';

// const helmet = require("helmet");
import routes from './routes';
const PORT = process.env.PORT || 3000;

createConnection().then(async () => {

    // create express app
    const app = express();

    //middelwares
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use('/',routes);

    // start express server
    app.listen(PORT, ()=>console.log(`Server running on PORT ${PORT}`));

}).catch(error => console.log(error));
