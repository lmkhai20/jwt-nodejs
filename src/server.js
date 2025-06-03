import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import bodyParser from 'body-parser';
import connectDB from './config/connectDB';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

configViewEngine(app);
connectDB();
initWebRoutes(app);


app.listen(PORT, () => {
    console.log('JWT backen is running on port: ' + PORT);
})