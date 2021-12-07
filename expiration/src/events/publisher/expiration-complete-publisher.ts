import {
  Publisher,
  Subjects,
  ExpirationCompleteEvent,
} from "@joerggasttickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
