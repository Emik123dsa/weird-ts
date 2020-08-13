import { BootstrapServer } from "./server";

import * as dotenv from "dotenv";

import { DotenvParseOptions } from "dotenv";

const { parsed } = dotenv.config();

const { NODE_PORT, HMR_ENABLED } = parsed;

let hmr: boolean = HMR_ENABLED === "true";

const server = new BootstrapServer(NODE_PORT, hmr);

