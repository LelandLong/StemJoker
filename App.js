import * as React from "react";

import { UserContextProvider } from "./context/user.context";
import { CloudDataContextProvider } from "./context/cloudData.context";
import { AppNavigator } from "./navigators/app.navigator";

// - - - - - - - - - - - - - - - - - - - -

export default function App() {
  return (
    <UserContextProvider>
      <CloudDataContextProvider>
        <AppNavigator />
      </CloudDataContextProvider>
    </UserContextProvider>
  );
}
