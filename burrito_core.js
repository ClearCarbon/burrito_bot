var amqp = require('amqp');
var irc = require('irc');

var config = {
                amqp: {host: 'localhost'},
                irc: {channel: '#sheffgeeks'}
              };


var connection = amqp.createConnection({host: config.amqp.host,
  reconnect: true});
console.log('amqp connection created');
connection.on('ready', function(){
  console.log('amqp connection established');

  connection.exchange("burrito", {type: "topic"}, function(exchange) {
    rabbitReady(exchange);
  });

});

function rabbitReady(exchange) {

  var client = new irc.Client('chat.freenode.net', 'burrito_bot', {
        channels: [config.irc.channel],
        debug: true
  });

  console.log('joined ' + config.irc.channel);

  client.addListener('message', function (from, to, message) {
    exchange.publish(messageKey(to, from), message, {contentType: "text/plain"});
  });

  function messageKey(channel, user) {
    channel_name = channel.replace("#","");
    key = channel_name + '.' + user + '.message';

    return key;
  }

}
