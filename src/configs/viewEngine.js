import express from 'express';

const configViewEngine = (app) => {
    app.use(express.static('./src/public'));
    app.set('view engine', 'ejs');
    app.set('views', './ser/views');
}

export default configViewEngine;