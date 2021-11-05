import nats, { Message } from "node-nats-streaming";
// @ts-ignore
import { randomBytes } from "crypto";

console.clear();

const client = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

// @ts-ignore
client.on("connect", () => {
  console.log("Listener connected to NATS");

  // @ts-ignore
  client.on("close", () => {
    console.log("NATS connection closed");
    // @ts-ignore
    process.exit();
  });

  const options = client
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("accounting-service");

  const subscription = client.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );

  // @ts-ignore
  subscription.on("message", (msg: Message) => {
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
    }

    msg.ack();
  });
});

// @ts-ignore
process.on("SIGINT", () => {
  client.close();
});

// @ts-ignore
process.on("SIGTERM", () => {
  client.close();
});
