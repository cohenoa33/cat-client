import type { Feeding, FeedingByDateObject } from "../types";

export function sumFromFeedingObjectByDate(
  feedings: FeedingByDateObject[],
  today: string
): number {
  const todaysFeeding = feedings.find((x) => x.date === today);
  if (todaysFeeding?.feedings) {
    return todaysFeeding.feedings.reduce(function (accumulator, currentValue) {
      return accumulator + currentValue.weight;
    }, 0);
  }

  return 0;
}
export function sumFromFeedingArray(feedings: Feeding[]): number {
  return feedings.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.weight;
  }, 0);
}
