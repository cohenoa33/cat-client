import type { Feeding as FeedingType } from "../types";
import { sumFromFeedingArray } from "../helpers/sum";
import { Feeding } from "./Feeding";

export function FeedingByDay({
  feedings,
  date,
  deleteFeeding,
  updateFeeding
}: Props) {
  if (!feedings) return <></>;

  return (
    <div>
      <br />
      Date: {date} Total: {sumFromFeedingArray(feedings)}g
      <ul>
        {feedings.map((feeding: FeedingType) => (
          <Feeding
            key={feeding._id}
            feeding={feeding}
            deleteFeeding={deleteFeeding}
            updateFeeding={updateFeeding}
          />
        ))}
      </ul>
      <br />
    </div>
  );
}

interface Props {
  feedings: FeedingType[];
  date: string;
  deleteFeeding: (id: string) => void;
  updateFeeding: (
    id: string,
    weight: number,
    type: string,
    food?: string
  ) => void;
}
