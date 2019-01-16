const bodyParser = require('body-parser');
const express = require('express');

const port = process.env.PORT || 5000;

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.post('/receive_slack_command', function (req, res) {
  console.log(req.body);
  res.send('Hello POST! = ' + req.body.text);
});

app.get('/', function (req, res) {
  res.send('Randy: https://github.com/kjirou/slack-bot-randy');
});

app.listen(port);
