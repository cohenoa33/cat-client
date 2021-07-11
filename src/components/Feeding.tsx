import type { Feeding as FeedingType } from "../types";
import type { ReactElement, SyntheticEvent } from "react";
import { useState } from "react";
import { editSVG, saveSVG, deleteSVG, backSVG } from "../helpers/svg";

export function Feeding({
  feeding,
  deleteFeeding,
  updateFeeding
}: Props): ReactElement {
  const [edit, setEdit] = useState(false);
  const [weight, setWeight] = useState(feeding.weight);
  const [type, setType] = useState(feeding.feedingType);
  const [food, setFood] = useState(feeding.foodType);

  function handleChange(event: SyntheticEvent) {
    const name = (event.target as HTMLInputElement).name;
    const value = (event.target as HTMLInputElement).value;

    if (name === "weight") {
      setWeight(+value);
    }
    if (name === "type") {
      setType(value);
    }
    if (name === "food") {
      setFood(value);
    }
  }

  function types() {
    const types = ["ball", "board", "auto", "bowl"];
    return types.filter((t) => t !== type).sort((a, b) => a.localeCompare(b));
  }

  if (!feeding) return <></>;

  if (edit) {
    return (
      <li key={feeding._id}>
        <input
          type="number"
          min={0.5}
          step="0.5"
          defaultValue={weight}
          name="weight"
          onClick={handleChange}
        />{" "}
        g @{getTime(feeding.created)}{" "}
        <select name="type" onChange={handleChange}>
          <option value="type">{type}</option>
          {types().map((type, index) => (
            <option key={"type-" + index + "-" + type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <button
          className="edit-button"
          role="img"
          aria-label="Save"
          onClick={() => {
            updateFeeding(feeding._id, weight, type, food);
            setEdit(!edit);
          }}
        >
          {saveSVG}
        </button>
        <button
          className="edit-button"
          onClick={() => setEdit(!edit)}
          role="img"
          aria-label="Back"
        >
          {backSVG}
        </button>
      </li>
    );
  }

  return (
    <li key={feeding._id}>
      {feeding.weight}g @{getTime(feeding.created)} ({feeding.feedingType})
      <button
        className="delete-button"
        role="img"
        aria-label="Delete"
        onClick={() => deleteFeeding(feeding._id)}
      >
        {deleteSVG}
      </button>
      <button
        className="edit-button"
        onClick={() => setEdit(!edit)}
        role="img"
        aria-label="Edit"
      >
        {editSVG}
      </button>
    </li>
  );
}

interface Props {
  feeding: FeedingType;
  deleteFeeding: (id: string) => void;
  updateFeeding: (
    id: string,
    weight: number,
    type: string,
    food?: string
  ) => void;
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
