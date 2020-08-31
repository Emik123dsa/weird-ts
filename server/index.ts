import { BootstrapServer } from './server.browser';

import * as dotenv from 'dotenv';

import { DotenvParseOptions } from 'dotenv';

const { parsed } = dotenv.config();

const { NODE_PORT, HMR_ENABLED } = parsed;

const hmr: boolean = HMR_ENABLED === 'true';

const server = new BootstrapServer(NODE_PORT, hmr);
