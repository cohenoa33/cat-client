import { createContext } from "react";
import type { ReactElement } from "react";

//set default user to empty object
export const UserContext = createContext({
  user: {}
});

// provides context,passing user as props
export function UserProvider({ children, user }: Props): ReactElement {
  const provider = {
    user: user
  };
  return (
    <UserContext.Provider value={provider}>{children}</UserContext.Provider>
  );
}

interface Props {
  children: any;
  user: any;
}
