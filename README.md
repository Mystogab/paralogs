# Paralogs (yes!, parallel-logs)
Logging made parallel

## Introduction
Why you would log into your main process-single threaded event-loop based NodeJs, when you could do it on a separate process?.
Come on! let fork this out

## Inspiration
I really wanted a non blocking logging tool that has no third party dependencies and can weigh at less as possible.
So I made this lib.

## Install
Go ahead with:
> yarn add paralogs

## Usage
Just import this thing:
> const log = require('paralogs');

And have some fun with: 
```
log.info('This is an Info msg');
log.info('This is an Info msg');
log.info('This is an Info msg');
log.warn('Hey!! this is a WARNING!');
log.warn('Hey!! this is a WARNING!');
log.error('You CANT say that Ive already toll ya');
log.error('Booo Im an error, shuuu!!');

log.info({
    bol: true,
    name: 'gato',
    age: 122,
    date: new Date()
});

setTimeout(function(){
    console.log('sending log') 
    log.info("I came out from another child bro"); 
}, 12000);
```
That will show you:

![alt text](https://raw.githubusercontent.com/Mystogab/common/master/paralogs_screenshot.png.png "sample")

YES, objects are automagically converted to a happy strings. Happy strings are good for you

The Paralog inactivity shoutdown message, means that internally, if you don't log anything the child process will die, and feel sad because he couldn't do his job. Poor child.

But don't worry about that, if you call some function like `.info('Hi!')` another child will born, to fulfill his dead brother destiny, and maybe, just maybe win your heart.

## Options (**NEW STUFF!!!**)
I have some exiting news for you: OPTIONS. now when you import the library you can tell your preferences like this:
```
const log = require('paralogs');

log.config(options); // YAY!
```

Where options is an object like this:
```
const options = {
  logLevel: 'info',
  timeToDie: 100,
  logMessageType: true,
  colors: {
    info: 'FgBlue',
    warn: 'FgYellow',
    error: 'FgRed',
    debug: 'FgGreen'
  }
```

Lets see what does each option

>**logMessageType** `(Boolean)`

When It's set to `true` it will show the type before the log ie: `[INFO]`. When it is set to `false` it wont be printed. Default: `true`

>**logLevel** `(string)`. As the name indicates it let you set the level for loggin, they are:

- debug
- info
- warn
- error

It must be an string, and in order top to bottom it will log including all levels below. IE: if you set loglevel in `debug` you will see debug, info, warn and error. But if you set it on `warn` you will only see warn and error.

>**timeToDie** `(number)`. It represent the time that our lovely logger child will wait with nothig to do to die. 

It must be a number between 100 and 30000. Value expresed on milisencods.

>**colors** `(Object)`. You can choose from a pre-defined colors for each kind of log which color you want. (YES I know you couldn't sleep waiting for this)

This should be an object that every value of a key is an string AND is some of this options:

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
  'BgWhite'.

I have not tested everyone but the Bg stands for Background and Fg for Foreground (letters color)

## Disclaimer
I just really did this to archive some basic functionallity, in future versions I have plans to make it take some options (like change default colors) and other stuff like that. 

Please feel free to fork this on github and send me your PRs

## IMPORTANT
In next version I will add a couple more options and then start working on code optimizations. Also pointing on amazon lambdas context support feature (may not be parallel but it **will** work.)

## About Amazon Web Services
TL;DR: Don't use it YET.

**NEWS**: I will be working on a sub-mode for this library in order to work on your lambdas! So **next versions will inlude Lambda support**!

If your are planning to use this library on AWS Lambda for instance, AWS optimize their nodejs for single process single thread, and also won't wait for event loop to be clean. (you won't see any logs, moment you do `return` moment your process die).
So this is (sadly) **by now** not usefull for your Lambdas.

## Changelog

### v0.2.2
- **New Feature**: Added `logMessageType` option!
- Modified Readme with important news about AWS

### v0.2 [**VERY HOT!**]
- **New Feature**: Added `debug` option
- **New Feature**: Added `options` parameter
- No child is generated until log is needed
- Fixed some typos

### v0.1.3
- Some minnor fixes
- Reduced the time for child exit, when nobody is using it
- Added install instructions
- Fix some docs typos
- Added AWS recomendations

### v0.1.2 [HOTFIX]
- Added dirname references for forking. Now the module is working correct.

### v0.1.1
- Added GitHub repo (ya, could happen)

### v0.1
- First Version of this awesome (you know is true) library