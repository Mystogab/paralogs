const { fork } = require('child_process');
const { join } = require('path');
const colors = require('./colors');

let logger = {};

//Helpers functions
const isChildDead = () => !logger.connected;
const haveAnotherChild = () => { logger = fork(join(__dirname + '/logger.js')) };

const _processColors = (rawColors) => {
  const realColors = {};
  Object.keys(rawColors).forEach(k => {
    realColors[k] = colors[rawColors[k]];
  });

  if(!realColors.info) realColors.info = colors.FgBlue;
  if(!realColors.warn) realColors.warn = colors.FgYellow;
  if(!realColors.error) realColors.error = colors.FgRed;
  if(!realColors.debug) realColors.debug = colors.FgGreen;
  
  return realColors;
};

const _checkTypes = (opt) => {
  if ( (opt.colors && !opt.colors instanceof Object) ||
  (opt.timeToDie && typeof opt.timeToDie !== 'number') ||
  (opt.logLevel && typeof opt.logLevel !== 'string')) {
    throw new Error(`Options validation error: 
    Colors should be an array of strings.
    timeToDie should be a Number.
    logLevel should be an Object`);
  };

  return true;
}

const _checkColors = (cols) => {
  if (!cols instanceof Object) {
    throw new Error(`Colors should be an object`);
  }
  const validColors = [ 'Reset',
  'Bright',
  'Dim',
  'Underscore',
  'Blink',
  'Reverse',
  'Hidden',
  'FgBlack',
  'FgRed',
  'FgGreen',
  'FgYellow',
  'FgBlue',
  'FgMagenta',
  'FgCyan',
  'FgWhite',
  'BgBlack',
  'BgRed',
  'BgGreen',
  'BgYellow',
  'BgBlue',
  'BgMagenta',
  'BgCyan',
  'BgWhite' ];
  if (!Object.keys(cols).every(k => validColors.includes(cols[k]))) {
    throw new Error(`Invalid color, valid color names are: 
    ${validColors}`);
  };

  return true
};

const _checkTtd = (ttd) => {
  if(ttd > 100 && ttd < 30000) return true;
  throw new Error(`timeToDie must be between 100 and 30000`);
};

const _checkLevel = (lvl) => {
  const validLevels = [ 'debug', 'info', 'warn', 'error' ];
  if (validLevels.includes(lvl)) return true;
  throw new Error(`Invalid loglevel. Must be one of this: ${validLevels}`);
};

const _validateOptions = (opt) => {
  _checkTypes(opt);
  if (opt.logLevel) {
    _checkLevel(opt.logLevel);
  } else {
    opt.logLevel = options.logLevel;
  }
  if (opt.timeToDie) {
    _checkTtd(opt.timeToDie);
  } else {
    opt.timeToDie = options.timeToDie;
  }
  if (opt.colors) {
    _checkColors(opt.colors);
  } else {
    opt.colors = options.colors;
  }
}

//Base Logger
const log = (message) => {
  if(isChildDead()) {
    haveAnotherChild();
    logger.send({...options, areOptions: true});
  };
  logger.send(message);
};

let options = {
  logLevel: 'info',
  timeToDie: 100,
  colors: {
    info: colors.FgBlue,
    warn: colors.FgYellow,
    error: colors.FgRed,
    debug: colors.FgGreen
  }
}

module.exports.info = async (body) => {
  log({
    type: 'info',
    body
  });
};

module.exports.error = async (body) => {
  log({
    type: 'error',
    body
  });
};

module.exports.warn = async (body) => {
  log({
    type: 'warn',
    body
  });
};

module.exports.debug = async (body) => {
  log({
    type: 'debug',
    body
  });
};

module.exports.config = (opt) => {
  _validateOptions(opt);
  options = {
    ...opt,
    colors: _processColors(opt.colors)
  };
};
