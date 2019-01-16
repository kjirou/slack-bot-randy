const lexer = (fullInput) => {
  return fullInput
    .split(/\s+/)
    .filter(fragment => fragment !== '');
};

const choice = (args) => {
  let result = {
    isValid: false,
    output: '`choice` requires one or more arguments',
  };

  if (args.length === 0) {
    return result;
  }

  return {
    isValid: true,
    output: args[Math.floor(Math.random() * args.length)],
  };
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

const help = (args) => {
  const output = `
\`\`\`
Usage:
  /randy <One of SUB-COMMANDS> [<ARGS>]

SUB-COMMANDS:
  choice:
    Randomly choice one of the arguments.

    Example:
      /randy choice Foo Bar Baz

  dice:
    Roll the dice.

    Examples:
      /randy dice 1d100
      /randy dice 3d6

  help:
    Output usage.

    Example:
      /randy help

ARGS:
  It is split by whitespace and interpreted as multiple arguments for each sub-commands.
\`\`\``;

  return {
    isValid: true,
    output,
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
  } else if (subCommandName === 'help') {
    result = Object.assign({}, help(subCommandArgs));
  }

  return result;
};

module.exports = {
  evaluateInput,
};
