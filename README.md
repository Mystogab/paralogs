# Paralogs (yes!, parallel-logs)
Logging made parallel

## Introduction
Why you would log into your main process-single thread but event loop based NodeJs, when you could do it to a separate process?.
Come on! let fork this out

## Inspiration
I really wanted a non blocking logging tool that has no third party dependencies and can weigh at less as possible.
So I made this lib.

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

The Paralog inactivity shoutdown message, means that internally, if you don't log anything the child process wild die, and feel sad because he couldn't do his job. Poor child.

But don't worry about that, if you call some method like `.info('Hi!')` another child will born, to fulfill his dead brother mission, and maybe, just maybe win your heart.

## Disclaimer
I just really did this to archive some basic functionallity, in future versions I have plans to make it take some options (like change default colors) and other stuff like that. 

Please feel free to fork this on github and send me your PRs

## Changelog

### v0.1
- First Version of this awesome (you know is true) library