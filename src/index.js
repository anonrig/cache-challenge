require('dotenv').config();

const http = require('./http');
const mongodb = require('./lib/mongodb');
const logger = require('./lib/logger');

const app = async () => {
  await mongodb.init();

  await http.listen();
};


app()
  .then(() => logger.info(`Successfully booted`))
  .catch((error) => logger.error(`Failed to boot`, error));
