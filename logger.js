const colors = require('./colors');

let config = {
  colors: {
    info: colors.FgBlue,
    warn: colors.FgYellow,
    error: colors.FgRed,
    debug: colors.FgGreen
  },
  timeToDie: 100,
  logLevel: 'info',
  logMessageType: true
};

let timeToDie = new Date().valueOf() + config.timeToDie;

const resetTimeToDie = () => {
  timeToDie = new Date().valueOf() + config.timeToDie;
};

const logLevels = {
  debug: [ 'debug', 'info', 'warn', 'error' ],
  info: [ 'info', 'warn', 'error'],
  warn: [ 'warn', 'error' ],
  error: [ 'error' ]
};

const _shouldILog = (type) => {
  //console.log(Object.keys(config));
  //console.log(logLevels[config.logLevel]);
  return logLevels[config.logLevel].includes(type);
};

const processMessage = (msg) => {
  if (_shouldILog(msg.type)) {
    if (typeof msg.body === 'object') {
      msg.body = JSON.stringify(msg.body, null, 2);
    };

    const messageTypeTag = config.logMessageType ? `[${msg.type.toUpperCase()}]: ` : '';
  
    console[msg.type](`${config.colors[msg.type]}%s\x1b[0m`, `${messageTypeTag}${msg.body}`);
  };
};

process.on('message', (msg) => {
  if (msg.areOptions) {
    config = msg;
  } else {
    resetTimeToDie();
    processMessage(msg);
  };
});

//Kill if no one is loggin for a while
setInterval(() => {
  if (new Date().valueOf() > timeToDie) {
    console.info('[ Paralog inactivity shutdown ]');
    process.exit();
  }
}, 100);
