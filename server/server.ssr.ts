import { enableProdMode } from '@angular/core';

import 'zone.js/dist/zone-node';

import 'reflect-metadata';

import * as express from 'express';

const PORT: string | number = 3000;
// const isHmr: boolean = process.env.NODE_HMR === 'true';
import {
    Response,
    Request,
    RequestHandler,
    ErrorRequestHandler,
} from 'express';

// import * as webpack from 'webpack';

// const webpackConfig = require('./webpack.config.server.dev');

// import * as webpackMiddleware from 'webpack-dev-middleware';

// import * as webpackHotMiddleware from 'webpack-hot-middleware';

const app = express();

// const webpackCompiler = webpack(webpackConfig);

// const wpmw = webpackMiddleware(webpackCompiler);

// app.use(wpmw);

// const wphmw = webpackHotMiddleware(webpackCompiler);

// app.use(wphmw);

import { join } from 'path';

import { ngExpressEngine } from '@nguniversal/express-engine';

import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

enableProdMode();

const {
    AppServerModuleNgFactory,
    LAZY_MODULE_MAP,
} = require('../src/boostrap.server.ts');

app.engine(
    'html',
    ngExpressEngine({
        bootstrap: AppServerModuleNgFactory,
        providers: [provideModuleMap(LAZY_MODULE_MAP)],
    }),
);

const DIST_FOLDER = join(process.cwd(), 'build');

app.set('view engine', 'html');

app.set('views', DIST_FOLDER);

app.use(express.static(DIST_FOLDER));

app.get('*', (req: Request, res: Response): void => {
    res.render('index', { req });
});

app.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
});
