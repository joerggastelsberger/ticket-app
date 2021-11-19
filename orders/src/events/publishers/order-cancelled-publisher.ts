import { Publisher, OrderCancelledEvent, Subjects } from "@joerggasttickets/common"

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}