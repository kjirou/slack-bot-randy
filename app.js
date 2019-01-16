const bodyParser = require('body-parser');
const express = require('express');

const {evaluateInput} = require('./lib/slack-command-interpreter');

const port = process.env.PORT || 5000;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.post('/receive_slack_command', function (req, res) {
  const result = evaluateInput(req.body.text);
  const responseMessage = `\`${req.body.text}\` => ${result.output}`;
  res.send(responseMessage);
});

app.get('/', function (req, res) {
  res.send('Randy: https://github.com/kjirou/slack-bot-randy');
});

app.listen(port);
