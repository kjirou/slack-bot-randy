const lexer = (fullText) => {
  return fullText
    .split(/\s+/)
    .filter(fragment => fragment !== '');
};

const choice = (args) => {
};

const dice = (args) => {
  const generalErrorMessage = '`dice` requires one argument like `1d6` or `2d8`';

  if (args.length !== 1) {
    return generalErrorMessage;
  }

  const matchResult = /^(\d+)d(\d+)$/.exec(args[0]);
  if (matchResult === null) {
    return generalErrorMessage;
  }

  const rollTimes = Number(matchResult[1]);
  const diceSides = Number(matchResult[2]);

  const rollResults = [];
  for (let t = 1; t <= rollTimes; t++) {
    rollResults.push(Math.ceil(Math.random() * diceSides));
  }

  return rollResults.reduce((m, e) => m + e, 0).toString();
};

const parseText = (fullText) => {
  const result = {
    responseMessage: '',
  };

  const [subCommandName, ...subCommandArgs] = lexer(fullText);

  if (subCommandName === 'choice') {
    result.responseMessage = choice(subCommandArgs);
  } else if (subCommandName === 'dice') {
    result.responseMessage = dice(subCommandArgs);
  } else {
    result.responseMessage = 'Invalid sub-command name.';
  }

  return result;
};

module.exports = {
  parseText,
};
