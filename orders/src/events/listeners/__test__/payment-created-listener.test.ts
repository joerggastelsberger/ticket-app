import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { PaymentCreatedEvent, OrderStatus } from "@joerggasttickets/common";
import { PaymentCreatedListener } from "../payment-created-listener";
import { Ticket } from "../../../models/ticket";
import { Order } from "../../../models/order";
import { natsWrapper } from "../../../nats-wrapper";

const setup = async () => {
  // Create an instance of the listener
  const listener = new PaymentCreatedListener(natsWrapper.client);

  // Create and save a ticket
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 15,
  });
  await ticket.save();

  // Create and save an order
  const order = Order.build({
    userId: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.AwaitingPayment,
    expiresAt: new Date(),
    ticket,
  });
  await order.save(); 

  // Create a fake data event
  const data: PaymentCreatedEvent["data"] = {
    id: "1234",
    orderId: order.id,
    stripeId: "1234",
  };

  // Creata a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg, ticket, order };
};

it("finds and updates an order", async () => {
  const { listener, data, msg } = await setup();

  // Call the onMessage function with the data object + the message object
  await listener.onMessage(data, msg);

  // Write assertions to make sure that an order was updated
  const updatedOrder = await Order.findById(data.orderId);

  expect(updatedOrder!.status).toEqual(OrderStatus.Complete);
});

it("acks the message", async () => {
  const { listener, data, msg } = await setup();

  // Call the onMessage function with the data object + the message object
  await listener.onMessage(data, msg);

  // Write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});
