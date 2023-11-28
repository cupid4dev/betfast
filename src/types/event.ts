export type Participant = {
  name: String,
  id: String
};

export type Market = {
  marketAccount: String,
  marketLock: number,
  marketName: String,
  outComes: [String],
  invalidOutcomes: [String],
  displayPriority: number,
  mint: String
}

export type Event = {
  eventAccount: String,
  eventName: String,
  participants: [Participant],
  eventStart: number,
  estimatedEnd: number,
  category: String,
  categoryTitle: String,
  eventGroup: String,
  eventGroupTitle: String,
  displayPriority: number,
  markets: [Market]
}

export type EventGroup = {
  id: String,
  title: String,
  displayPriority: number,
  events: [Event],
}

export type EventCategory = {
  id: String,
  title: String,
  displayPriority: number,
  heroBanner: String,
  eventGroup: [EventGroup]
}