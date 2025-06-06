require('dotenv').config();

const configCors = (app) => {
    const allowCrossDomain = (req, res, next) => {
        res.header(`Access-Control-Allow-Origin`, process.env.REACT_URL);
        res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE,OPTIONS`);
        res.header(`Access-Control-Allow-Headers`, `X-Requested-With,Content-Type`);
        res.header(`Access-Control-Allow-Credentials`, true);
        next();
    };
    app.use(allowCrossDomain);
}

export default configCors;