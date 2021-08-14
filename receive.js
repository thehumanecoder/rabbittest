const amqp = require("amqplib/callback_api");

amqp.connect("amqp://localhost", (err, connection) => {

    if (err) throw err;

    connection.createChannel((err, channel) => {
        if (err) throw err;
        const queue = "queue1";
        channel.assertQueue(queue, { durable: false });
        console.log("[*] Waiting for the message in %s . To exit press CTRL+C", queue);
        channel.consume(queue, (msg) => {
                console.log(" [x] Received %s", msg.content.toString());
            }, { noAck: true }

        );
    });
});