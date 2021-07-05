import type { Feeding, FeedingByDateObject } from "../types";

export function filterFeeding(feedings: Feeding[]) {
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
  return feedingsArray;
}

export function addFeedingToState(
  feedings: FeedingByDateObject[],

  feeding: Feeding
) {
  const feedingsArray = feedings;
  const today = new Date().toISOString().slice(0, 10);

  const isExist = feedings.find((feeding) => feeding.date === today);
  if (isExist) {
    isExist.feedings.push(feeding);
  } else {
    feedingsArray.push({ date: today, feedings: [feeding] });
  }

  return feedingsArray;
}

export function deleteFeedingFromState(
  feedings: FeedingByDateObject[],
  deletedFeeding: Feeding
) {
  const feedingsArray = feedings.filter(
    (feeding) => feeding.date === deletedFeeding.created.slice(0, 10)
  );
  const returnArray = feedings.filter(
    (feeding) => feeding.date !== deletedFeeding.created.slice(0, 10)
  );
  const dayFeeding = feedingsArray[0].feedings.filter(
    (feeding) => feeding._id === deletedFeeding._id
  );

  returnArray.push({
    date: deletedFeeding.created.slice(0, 10),
    feedings: dayFeeding
  });

  return feedingsArray;
}
