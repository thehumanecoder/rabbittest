const amqp = require("amqplib/callback_api");
amqp.connect('amqp://localhost', function(err, connection) {
    if (err) throw err;

    connection.createChannel((error, channel) => {
        if (error) throw error;

        const queue = "queue1";
        const msg = "Hello world";
        channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(msg));
        console.log(" [x] Sent '%s'", msg);
    });

    setTimeout(() => {
        connection.close();
        process.exit(1);
    }, 1000);
});