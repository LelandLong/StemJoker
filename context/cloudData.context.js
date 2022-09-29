import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestTokenFromFMS } from "../communication/requestToken";
import { requestTestDataFromFMS } from "../communication/requestTestData";
import { requestLogoutFromFMS } from "../communication/requestLogout";

// - - - - - - - - - - - - - - - - - - - -

export const CloudDataContext = createContext();

// - - - - - - - - - -

export const CloudDataContextProvider = ({ children }) => {
  const [cloudData, setCloudData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //   console.log("CloudDataContextProvider instantiated, cloudData: ", cloudData);

  // - - - - - - - - - -

  const saveCloudData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@cloudData", jsonValue);
      console.log(
        "CloudDataContextProvider.saveCloudData successfully stored user"
      );
    } catch (e) {
      console.log("CloudDataContextProvider.saveCloudData error storing", e);
    }
  };

  // - - - - - - - - - -

  const loadCloudData = async () => {
    console.log("CloudDataContextProvider.loadUser triggered...");
    try {
      const value = await AsyncStorage.getItem("@cloudData");
      if (value !== null) {
        console.log(
          "CloudDataContextProvider.loadCloudData successfully loaded cloudData"
        );
        setCloudData(JSON.parse(value));
      } else {
        console.log("CloudDataContextProvider.loadCloudData returned NULL");
      }
    } catch (e) {
      console.log("CloudDataContextProvider.loadCloudData error loading", e);
    }
  }; // - - - - - - - - - -

  const onRequestTestData = (server, username) => {
    console.log("cloudDataContext.onRequestTestData launched...");

    setIsLoading(true);
    requestTokenFromFMS()
      .then((fmsResult) => {
        const theToken = fmsResult.response.token;
        console.log("cloudDataContext.onRequestTestData token: ", theToken);

        requestTestDataFromFMS(theToken)
          .then((response) => {
            var tempList = [];
            const scriptResult = JSON.parse(response.response.scriptResult);
            const queryStatus = scriptResult.messages[0].code;

            if (queryStatus === "0") {
              const queryFoundCount = scriptResult.response
                ? scriptResult.response.dataInfo.foundCount
                : 0;
              const queryReturnedCount = scriptResult.response
                ? scriptResult.response.dataInfo.returnedCount
                : 0;
              console.log(
                "cloudDataContext.onRequestTestData queryStatus: ",
                queryStatus,
                "; queryFoundCount: ",
                queryFoundCount,
                "; queryReturnedCount: ",
                queryReturnedCount
              );

              setCloudData(scriptResult.response.data);
              //   saveProjectList(scriptResult.response.data);
            } else {
              console.log(
                "onRequestTestData FMS ERROR CODE: ",
                queryStatus,
                "; message: ",
                scriptResult.messages[0].message
              );
            }

            requestLogoutFromFMS(theToken)
              .then((result) => {
                setIsLoading(false);
                console.log(
                  "projectsContext.onLogout result: ",
                  result.messages[0].message
                );
              })
              .catch((err) => {
                setIsLoading(false);
                console.log("cloudDataContext.onLogout error: ", err);
              });
          })
          .catch((err) => {
            setIsLoading(false);
            console.log("cloudDataContext.onRequestTestData error: ", err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("cloudDataContext.onRequestTestData error: ", err);
        if (err.messages[0].code == 502) {
          console.log(
            "cloudDataContext.onRequestTestData errorCode=502 routing..."
          );
          //   setTryingAgain(true);
          //   setTries(tries + 1);
        }
      });
  };

  // - - - - - - - - - -

  return (
    <CloudDataContext.Provider
      value={{
        cloudData,
        isLoading,
        onRequestTestData,
      }}
    >
      {children}
    </CloudDataContext.Provider>
  );
};
