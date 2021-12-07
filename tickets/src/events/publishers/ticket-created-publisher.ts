import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@joerggasttickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
