const { fork } = require('child_process');
const { join } = require('path');

let logger = fork(join(__dirname + '/logger.js'));

//Helpers functions
const isChildDead = () => !logger.connected;
const haveAnotherChild = () => { logger = fork(join(__dirname + '/logger.js')) };

//Base Logger
const log = (message) => {
  if(isChildDead()) haveAnotherChild();
  logger.send(message);
};

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
