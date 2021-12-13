import {
  Subjects,
  Publisher,
  PaymentCreatedEvent,
} from "@joerggasttickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
