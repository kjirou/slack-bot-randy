const lexer = (fullInput) => {
  return fullInput
    .split(/\s+/)
    .filter(fragment => fragment !== '');
};

const executeChoice = (args) => {
  let result = {
    output: '`choice` requires one or more arguments',
    responseType: 'in_channel',
  };

  if (args.length === 0) {
    return result;
  }

  return {
    output: args[Math.floor(Math.random() * args.length)],
    responseType: 'in_channel',
  };
};

const executeDice = (args) => {
  const result = {
    output: '`dice` requires one argument like `1d6` or `2d8`',
    responseType: 'in_channel',
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
    output: rollResults.reduce((m, e) => m + e, 0).toString(),
    responseType: 'in_channel',
  };
};

const executeHelp = (args) => {
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
    output,
    responseType: 'ephemeral',
  };
};

const executeUnknown = () => {
  return {
    output: 'Invalid input',
    responseType: 'in_channel',
  };
};

const evaluateInput = (fullInput) => {
  const [subCommandName, ...subCommandArgs] = lexer(fullInput);

  const subCommandProcess = {
    choice: executeChoice,
    default: executeHelp,
    dice: executeDice,
    help: executeHelp,
  }[subCommandName] || executeUnknown;

  return subCommandProcess(subCommandArgs);
};

module.exports = {
  evaluateInput,
};
