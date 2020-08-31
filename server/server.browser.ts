import * as express from 'express';

import { Request, Response } from 'express';

import * as axios from 'axios';

import * as bodyParser from 'body-parser';

import * as path from 'path';

import * as webpack from 'webpack';

const staticHost = `http://localhost:3000/build/index.html` as string;

const webpackConfig = require('../webpack.dev.config.babel');

import * as webpackMiddleware from 'webpack-dev-middleware';

import * as webpackHotMiddleware from 'webpack-hot-middleware';

export class BootstrapServer {
    /**
     * App express
     *
     * @protected
     * @type {*}
     * @memberof BootstrapServer
     */
    protected app: any;
    /**
     * Config is required to establish data from constructor
     *
     * @protected
     * @type {({ [key: string]: string | number | boolean })}
     * @memberof BootstrapServer
     */
    protected config: { [key: string]: string | number | boolean };
    /**
     * An instance of Bootstrap service
     * @param {string} PORT
     * @param {boolean} [hmr]
     * @memberof BootstrapServer
     */
    public constructor(
        private readonly PORT: string,
        private readonly hmr?: boolean,
    ) {
        this.init()
            .then((ans) => {
                // const fileToSync = this.fetchIndexFromHost(staticHost).then(
                //   file => {

                // this.app.get("*", (req: Request, res: Response): void => {
                //   res.status(200).end(file);
                // });

                this.app.listen(
                    PORT,
                    () => {
                        console.log(`Server is listening : ${PORT}`);
                        //   });
                    },
                    // }
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }
    /**
     * Init function is allowing us to return Promise <resolved>,
     * if everything is fine
     *
     * @template T
     * @param {T} [arg]
     * @returns {(Promise<Boolean | any>)}
     * @memberof BootstrapServer
     */
    public init<T>(arg?: T): Promise<Boolean | any> {
        return new Promise((res, rej) => {
            try {
                this.app = express();

                this.helper();

                this.staticInit('build');

                if (this.hmr) {
                    this.initWithHmr();
                }

                res(true);
            } catch (e) {
                rej(e);
            }
        });
    }
    /**
     * Hot Module Replacement :')
     *
     * @template T
     * @param {T} [args]
     * @memberof BootstrapServer
     */
    public initWithHmr<T>(args?: T): void {
        const webpackCompiler = webpack(webpackConfig);

        const wpmw = webpackMiddleware(webpackCompiler);

        this.app.use(wpmw);

        const wphmw = webpackHotMiddleware(webpackCompiler);

        this.app.use(wphmw);
    }
    /**
     * Helper
     *
     * @private
     * @template T
     * @param {T} [variety]
     * @memberof BootstrapServer
     */
    private helper<T>(variety?: T): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    /**
     * Static listener for port
     *
     * @private
     * @template T
     * @param {string} [pathTo]
     * @memberof BootstrapServer
     */
    private staticInit<T>(pathTo?: string): void {
        this.app.use('/', express.static(path.resolve(pathTo)));
    }

    private async fetchIndexFromHost(staticUrL: string): Promise<string> {
        const res = await axios.default.get(staticUrL);

        return res.data;
    }
}
