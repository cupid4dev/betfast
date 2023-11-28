import { format, addDays } from "date-fns";

export function ts2LWDDLMYYYY(timestamp: number) {
  const date: Date = new Date(timestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formattedDate: string = date.toLocaleDateString("en-US", options);
  return formattedDate;
}

export function ts2TimeOptions(timestamp: number) {
  const date: Date = new Date(timestamp * 1000);

  // Format time
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "numeric",
    hour12: false, // Use 24-hour format
  };
  const formattedTime: string = date.toLocaleTimeString("en-US", timeOptions);

  return formattedTime.replace("24:", "00:");
}

export function ts2DateOptions(timestamp: number) {
  const date: Date = new Date(timestamp * 1000);
  // Format date
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "short",
  };
  const formattedDate: string = date.toLocaleDateString("en-US", dateOptions);
  return formattedDate;
}

export function ts2TodayTomorrow(timestamp: number) {
  const currentDate = new Date();
  const targetDate = new Date(timestamp * 1000);

  // Check if the target date is today
  if (
    targetDate.getDate() === currentDate.getDate() &&
    targetDate.getMonth() === currentDate.getMonth() &&
    targetDate.getFullYear() === currentDate.getFullYear()
  ) {
    return "Today";
  } else if (
    targetDate.getDate() === addDays(currentDate, 1).getDate() &&
    targetDate.getMonth() === addDays(currentDate, 1).getMonth() &&
    targetDate.getFullYear() === addDays(currentDate, 1).getFullYear()
  ) {
    return "Tomorrow";
  } else {
    // Use date-fns to format the target date
    const formattedDate = format(targetDate, "do, MMM");
    return `The ${formattedDate}`;
  }
}

export function hasElapsed(isoString: string, minutes: number): boolean {
  const originalDate = new Date(isoString);
  const elapsedMinutes = (new Date().getTime() - originalDate.getTime()) / (1000 * 60);
  return elapsedMinutes > minutes;
}

export function convertTimestampToDateString(timestampInSeconds: number) {
  const dateObject = new Date(timestampInSeconds * 1000);
  return dateObject.toUTCString();
}

export function nowTimestamp(): number {
  return Date.now() / 1000;
}
