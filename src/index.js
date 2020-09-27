const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const developerRoutes = require('./domains/developers/routes');

const { PORT } = process.env;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));

app.use('/api', developerRoutes);

try {
  app.listen(PORT);
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
} catch (e) {
  console.error(e);
}
