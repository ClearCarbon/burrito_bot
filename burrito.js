var burrito_time = '';
var channel = '#sheffgeeks'
var irc = require('irc');

var client = new irc.Client('chat.freenode.net', 'burrito_bot', {
      channels: [channel],
      debug: true
});

console.log('joined');

client.addListener('message', function (from, to, message) {
  // console.log(from + ' => ' + to + ': ' + message);
  if(message.indexOf('hello burrito_bot') != -1) {
    client.say(channel, "hello " + from);
  }

  if(message.indexOf('when is burrito time') != -1) {
    client.say(channel, 'burrito time is ' + burrito_time);
  }

  if(message.indexOf('what is the answer') != -1) {
    client.say(channel, '42');
  }

  var burrito_time_string = 'burrito time is ';
  var burrito_time_index = message.indexOf(burrito_time_string);
  if(burrito_time != -1) {
    burrito_time_index = burrito_time_index + burrito_time_string.length
    if(message.length > burrito_time_index) {
      burrito_time = message.substr(burrito_time_index);
    }
  }
});
