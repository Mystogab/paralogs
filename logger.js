const colors = require('./colors');
let timeTtoDie = new Date().valueOf() + 1000 * 10;

const resetTimeToDie = () => {
  timeTtoDie = new Date().valueOf() + 1000 * 10;
};

const config = {
  colors: {
    info: colors.FgBlue,
    warn: colors.FgYellow,
    error: colors.FgRed
  }
};

const processMessage = (msg) => {
  if (typeof msg.body === 'object') {
    msg.body = JSON.stringify(msg.body, null, 2);
  }

  console[msg.type](`${config.colors[msg.type]}%s\x1b[0m`, `[${msg.type.toUpperCase()}]: ${msg.body}`);
};

process.on('message', (msg) => {
  resetTimeToDie();
  processMessage(msg);
});

//Kill if no one is loggin for a while
setInterval(() => {
  if (new Date().valueOf() > timeTtoDie) {
    console.info('[ Paralog inactivity shutdown ]');
    process.exit();
  }
}, 1000);
