import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";


export function cn(...inputs: (string | undefined | null | boolean | { [key: string]: boolean })[]): string {
  return twMerge(clsx(inputs));
}


export function formatDate(dateString: string): string {
  const dt = new Date(dateString.replace(/-/g, '/'));
  return moment(dt).format("MM/DD/YYYY");
}

export function formatDateForSummary(dateString: string | undefined): string {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${month}/${day}/${year}`;
}

export function formatTime(timeString: string): string {
  if (!timeString) return '';

  // Create a Date object for today's date with the given time
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours, 10));
  date.setMinutes(parseInt(minutes, 10));

  // Use toLocaleTimeString to format the time
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}