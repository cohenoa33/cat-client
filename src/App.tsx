import "./App.css";
import { useState, useEffect } from "react";
import { UserProvider } from "./containers/User";

function App() {
  const [user, setUser] = useState<User>();
  const [pet, setPet] = useState<Pet>();
  const [feedings, setFeeding] = useState<Feeding>();

  const URL = process.env.REACT_APP_URL;
  //TODO: after connect to jwt remove this hard codded authorization
  useEffect(() => {
    fetch(`${URL}`, {
      headers: {
        authorization: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDRlYjY3Y2Y3NjBiM2EwMzdkZmQ1YmUiLCJpYXQiOjE2MTU4MTI2NzB9.wa1z5wJuXrLR_CMZlJ4gTJAB9UPBW5dhQG2BCnPZHOw`
      },
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        setPet({ name: data.name });
        setUser({ id: data.user });
        setFeeding({ feedings: data.feedings });
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <UserProvider user={user}>
      <div className="container">
        This is {pet?.name} of user {user?.id}{" "}
      </div>
    </UserProvider>
  );
}

export default App;

interface User {
  id: string;
}
interface Pet {
  name: string;
}
interface Feeding {
  feedings: any;
}
