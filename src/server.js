import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configCors from './config/cors';
import bodyParser from 'body-parser';
import connectDB from './config/connectDB';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;


configCors(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

configViewEngine(app);
connectDB();
initWebRoutes(app);
initApiRoutes(app);


app.listen(PORT, () => {
    console.log('JWT backen is running on port: ' + PORT);
})