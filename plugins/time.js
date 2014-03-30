var amqp = require('amqp');

var config = {
                amqp: {host: 'localhost'},
              };

var connection = amqp.createConnection({ host: config.host });

// Wait for connection to become established.
connection.on('ready', function () {

  connection.queue('time', function(queue){
    queue.bind("burrito", "#", function() {
      queue.subscribe(function (message) {
        console.log('ready');
        console.log(message);
        var ircMessage = message.data.toString('utf8');
        console.log('message: ' + ircMessage);
        message.acknowledge();
      });

    });
  });

});

