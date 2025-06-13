import express from 'express';
import configViewEngine from './config/viewEngine';
import initWebRoutes from './routes/web';
import initApiRoutes from './routes/api';
import configCors from './config/cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectDB from './config/connectDB';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;


configCors(app);

configViewEngine(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//config cookie parser
app.use(cookieParser())


connectDB();
initWebRoutes(app);
initApiRoutes(app);

app.use((req, res) => {
    return res.send('404 not found');
})

app.listen(PORT, () => {
    console.log('JWT backen is running on port: ' + PORT);
})