import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@joerggasttickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
