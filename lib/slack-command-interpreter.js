const lexer = (fullInput) => {
  return fullInput
    .split(/\s+/)
    .filter(fragment => fragment !== '');
};

const choice = (args) => {
};

const dice = (args) => {
  const result = {
    isValid: false,
    output: '`dice` requires one argument like `1d6` or `2d8`',
  };

  if (args.length !== 1) {
    return result;
  }

  const matchResult = /^(\d+)d(\d+)$/.exec(args[0]);
  if (matchResult === null) {
    return result;
  }

  const rollTimes = Number(matchResult[1]);
  const diceSides = Number(matchResult[2]);

  const rollResults = [];
  for (let t = 1; t <= rollTimes; t++) {
    rollResults.push(Math.ceil(Math.random() * diceSides));
  }

  return {
    isValid: true,
    output: rollResults.reduce((m, e) => m + e, 0).toString(),
  };
};

const evaluateInput = (fullInput) => {
  let result = {
    isValid: false,
    output: 'Invalid arguments',
  };

  const [subCommandName, ...subCommandArgs] = lexer(fullInput);

  if (subCommandName === 'choice') {
    result = Object.assign({}, choice(subCommandArgs));
  } else if (subCommandName === 'dice') {
    result = Object.assign({}, dice(subCommandArgs));
  }

  return result;
};

module.exports = {
  evaluateInput,
};
