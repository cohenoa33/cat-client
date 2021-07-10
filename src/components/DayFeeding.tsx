import type { Feeding } from "../types";
import { sumFromFeedingArray } from "../helpers/sum";

export function FeedingByDay({ feedings, date, deleteFeeding }: Props) {
  if (!feedings) return <></>;

  return (
    <div>
      <br />
      Date: {date} Total: {sumFromFeedingArray(feedings)}g
      <ul>
        {feedings.map((feeding: Feeding) => (
          <li key={feeding._id}>
            {feeding.weight}g @{getTime(feeding.created)} ({feeding.feedingType}
            )
            <button
              className="delete-button"
              onClick={() => deleteFeeding(feeding._id)}
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <br />
    </div>
  );
}

interface Props {
  feedings: Feeding[];
  date: string;
  deleteFeeding: (id: string) => void;
}

function getTime(date: string) {
  const dateObject = new Date(date);
  let hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const abbreviation = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesString = minutes < 10 ? "0" + minutes : minutes.toString();

  return hours + ":" + minutesString + " " + abbreviation;
}
