export type Participant = {
  name: string,
  id: string
};

export type Market = {
  marketAccount: string,
  marketLock: number,
  marketName: string,
  outcomes: [string],
  invalidOutcomes: [string],
  displayPriority: number,
  mint: string
}

export type Event = {
  eventAccount: string,
  eventName: string,
  participants: [Participant],
  eventStart: number,
  estimatedEnd: number,
  category: string,
  categoryTitle: string,
  eventGroup: string,
  eventGroupTitle: string,
  displayPriority: number,
  markets: [Market]
}

export type EventGroup = {
  id: string,
  title: string,
  displayPriority: number,
  events: [Event],
}

export type EventCategory = {
  id: string,
  title: string,
  displayPriority: number,
  heroBanner: string,
  eventGroup: [EventGroup]
}