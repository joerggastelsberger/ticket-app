import { Publisher, OrderCreatedEvent, Subjects } from "@joerggasttickets/common"

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}