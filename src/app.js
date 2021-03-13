import express from 'express';
import dotenv from 'dotenv';

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { router as proxyRouter } from './proxy.js';

dotenv.config();

const {
  PORT: port = 3000,
} = process.env;

const app = express();
const path = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(path, '../public')));
app.use(express.static(join(path, '../node_modules/leaflet/dist')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*',);
  res.header('Access-Control-Allow-Methods', 'GET');
  next();
});

app.get('/', (req, res) => {
  res.sendFile('index.hmtl', { root: join(path, '../public') });
});

app.use(proxyRouter);

function notFoundHandler(req, res, next) {
  res.status(404).json({ error: 'Síða fannst ekki' });
}
app.use(notFoundHandler);

function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: 'Villa kom upp' });
}
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at http://$localhost:${port}/`);
});
