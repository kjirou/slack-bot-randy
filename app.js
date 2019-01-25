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
  const input = req.body.text || 'default';
  const result = evaluateInput(input);
  const responseMessage = `\`${input}\` => ${result.output}`;

  res.json({
    response_type: result.responseType,
    text: responseMessage,
  });
});

app.get('/', function (req, res) {
  res.send('Randy: https://github.com/kjirou/slack-bot-randy');
});

app.listen(port);
