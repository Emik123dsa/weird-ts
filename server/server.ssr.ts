import { enableProdMode } from '@angular/core';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import * as express from 'express';

import { join } from 'path';

import { ngExpressEngine } from '@nguniversal/express-engine';

import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

enableProdMode();
