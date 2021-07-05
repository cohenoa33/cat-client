import "./App.css";
import { useState, useEffect } from "react";
import { UserProvider } from "./containers/User";
import {
  filterFeeding,
  addFeedingToState,
  deleteFeedingFromState
} from "./helpers/filter-feeding";

import type { User, Pet, FeedingByDateObject } from "./types";
import { FeedingByDay } from "./components/DayFeeding";
import { ButtonsContainer } from "./components/ButtonsContainer";

function App() {
  const [user, setUser] = useState<User>();
  const [pet, setPet] = useState<Pet>();
  const [feedings, setFeeding] = useState<FeedingByDateObject[]>([]);

  const URL = process.env.REACT_APP_URL;

  useEffect(() => {
    fetch(`${URL}`, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        setPet({ name: data.name });
        setUser({ id: data.user });
        setFeeding(filterFeeding(data.feedings));
      })
      .catch((error) => console.log(error));
  }, [feedings]);

  function addFeeding(weight: number, type: string, food?: string) {
    const data = {
      foodType: "dry",
      feedingType: type,
      weight: weight,
      pet: "60e34cbc83f8365ed1c84250"
    };
    fetch(`http://localhost:8000/api/feedings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedFeeding = addFeedingToState(feedings, data);
        setFeeding(updatedFeeding);
      })
      .catch((error) => console.log(error));
  }
  function deleteFeeding(id: string) {
    const data = {
      id: id
    };
    fetch(`http://localhost:8000/api/feedings/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedFeeding = deleteFeedingFromState(feedings, data);
        setFeeding(updatedFeeding);
      })
      .catch((error) => console.log(error));
  }

  return (
    <UserProvider user={user}>
      <div className="container">
        <div>
          <ButtonsContainer addFeeding={addFeeding} />
          <br />
          {feedings.map((feeding: FeedingByDateObject) => (
            <FeedingByDay
              feedings={feeding.feedings}
              date={feeding.date}
              deleteFeeding={deleteFeeding}
            />
          ))}
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
