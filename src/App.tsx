import "./App.css";
import { useState, useEffect } from "react";
import { UserProvider } from "./containers/User";
import {
  createFeedingsArray,
  addFeedingToState,
  updateFeedingState
} from "./helpers/filter-feeding";

import type { User, Pet, FeedingByDateObject } from "./types";

import { FeedingByDay } from "./components/DayFeeding";
import { ButtonsContainer } from "./components/ButtonsContainer";
const URL = process.env.REACT_APP_URL;
const PET = process.env.REACT_APP_PET;

function App() {
  const [user, setUser] = useState<User>();
  const [pet, setPet] = useState<Pet>();
  const [feedings, setFeeding] = useState<FeedingByDateObject[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      fetch(`${URL}/pets/${PET}`, {
        method: "GET"
      })
        .then((res) => res.json())
        .then((data) => {
          setPet({ name: data.name, id: data._id });
          setUser({ id: data.user });
          setFeeding(createFeedingsArray(data.feedings));
        })
        .catch((error) => console.log(error));
    };

    fetchData();
  }, []);

  function addFeeding(weight: number, type: string, food: string = "dry") {
    const data = {
      foodType: food,
      feedingType: type,
      weight: weight,
      pet: pet?.id
    };
    fetch(`${URL}/feedings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedFeedings = addFeedingToState(feedings, data);
        setFeeding(updatedFeedings);
      })
      .catch((error) => console.log(error));
  }
  function updateFeeding(
    id: string,
    weight: number,
    type: string,
    food: string = "dry"
  ) {
    const data = {
      id: id,
      foodType: food,
      feedingType: type,
      weight: weight
    };

    fetch(`${URL}/feedings/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        const newFeedings = [...feedings];
        const updatedFeedings = updateFeedingState(newFeedings, data, true);
        setFeeding(updatedFeedings);
      })
      .catch((error) => console.log(error));
  }
  function deleteFeeding(id: string) {
    const data = {
      id: id
    };
    fetch(`${URL}/feedings/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then((res) => res.json())
      .then((data) => {
        const newFeedings = [...feedings];
        const updatedFeedings = updateFeedingState(newFeedings, data);
        setFeeding(updatedFeedings);
      })
      .catch((error) => console.log(error));
  }

  return (
    <UserProvider user={user}>
      <div className="container">
        <div>
          <ButtonsContainer addFeeding={addFeeding} />
          <br />
          {feedings.map((feeding: FeedingByDateObject, index) => (
            <FeedingByDay
              key={"day-" + index + "-" + feeding.date}
              feedings={feeding.feedings}
              date={feeding.date}
              deleteFeeding={deleteFeeding}
              updateFeeding={updateFeeding}
            />
          ))}
        </div>
      </div>
    </UserProvider>
  );
}

export default App;
