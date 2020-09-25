const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const { PORT } = process.env;

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '150mb' }));
app.use(bodyParser.urlencoded({ limit: '150mb', extended: true }));

app.use('/users', (req, res) => {
  res.send('OK');
});

try {
  app.listen(PORT);
  console.log(`App listening at port ${PORT}`);
} catch (e) {
  console.error(e);
}
