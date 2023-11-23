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

  return formattedTime;
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
