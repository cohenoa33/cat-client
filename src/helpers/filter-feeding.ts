import type { Feeding, FeedingByDateObject } from "../types";

export function createFeedingsArray(feedings: Feeding[]) {
  const feedingsArray: FeedingByDateObject[] = [];

  for (const feeding of feedings) {
    const date = feeding.created.slice(0, 10);
    const isExist = feedingsArray.find((feeding) => feeding.date === date);

    if (isExist) {
      isExist.feedings.push(feeding);
    } else {
      feedingsArray.push({ date: date, feedings: [feeding] });
    }
  }

  return feedingsArray.sort((a, b) => b.date.localeCompare(a.date));
}

export function addFeedingToState(
  feedings: FeedingByDateObject[],

  feeding: Feeding
) {
  const feedingsArray = [...feedings];
  const today = new Date().toISOString().slice(0, 10);

  const isExist = feedings.find((feeding) => feeding.date === today);
  if (isExist) {
    isExist.feedings.push(feeding);
  } else {
    feedingsArray.push({ date: today, feedings: [feeding] });
  }

  return feedingsArray;
}

export function updateFeedingState(
  feedings: FeedingByDateObject[],
  feedingToUpdate: Feeding,
  edit: boolean = false
) {
  const feedingsArray = [...feedings].filter(
    (feeding) => feeding.date === feedingToUpdate.created.slice(0, 10)
  );
  const dayFeeding = feedingsArray[0].feedings.filter(
    (feeding) => feeding._id !== feedingToUpdate._id
  );
  const returnArray = [...feedings].filter(
    (feeding) => feeding.date !== feedingToUpdate.created.slice(0, 10)
  );
  if (edit) dayFeeding.push(feedingToUpdate);

  returnArray.push({
    date: feedingToUpdate.created.slice(0, 10),
    feedings: dayFeeding
  });

  return returnArray;
}
