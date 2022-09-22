import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// - - - - - - - - - - - - - - - - - - - -

const initialUser = {
  name: "",
  age: 0,
};

// - - - - - - - - - - - - - - - - - - - -

export const UserContext = createContext();

// - - - - - - - - - -

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  //   console.log("UserContextProvider instantiated, user: ", user);

  // - - - - - - - - - -

  const saveUser = async (value) => {
    // try {
    //   const jsonValue = JSON.stringify(value);
    //   await AsyncStorage.setItem("@user", jsonValue);
    //   console.log("UserContextProvider.saveUser successfully stored user");
    // } catch (e) {
    //   console.log("UserContextProvider.saveUser error storing", e);
    // }
  };

  // - - - - - - - - - -

  const loadUser = async () => {
    console.log("UserContextProvider.loadUser triggered...");
    // try {
    //   const value = await AsyncStorage.getItem("@user");
    //   if (value !== null) {
    //     console.log("UserContextProvider.loadUser successfully loaded user");
    //     setUser(JSON.parse(value));
    //   } else {
    //     console.log("UserContextProvider.loadUser returned NULL");
    //   }
    // } catch (e) {
    //   console.log("UserContextProvider.loadUser error loading", e);
    // }
  };

  // - - - - - - - - - -

  const addUsername = (username) => {
    // var newEntry = { ...user };
    // newEntry.name = username;
    // setUser(newEntry);
    // saveUser(newEntry);
    // console.log("UserContextProvider.addUser: ", newEntry);
  };

  // - - - - - - - - - -

  const addAge = (age) => {
    // var newEntry = { ...user };
    // newEntry.age = age;
    // setUser(newEntry);
    // saveUser(newEntry);
    // console.log("UserContextProvider.addAge: ", newEntry);
  };

  // - - - - - - - - - -

  return (
    <UserContext.Provider
      value={{
        user,
        addUsername,
        addAge,
        loadUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
