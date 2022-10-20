import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestTokenFromFMS } from "../communication/requestToken";
import { requestTestDataFromFMS } from "../communication/requestTestData";
import { requestDataFromFMS } from "../communication/requestData";
import { requestLogoutFromFMS } from "../communication/requestLogout";
import { sendNewJoke } from "../communication/sendNewJoke";
import { sendNewVote } from "../communication/sendNewVote";

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

  const onRequestTestData = () => {
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

  const onRequestData = () => {
    console.log("cloudDataContext.onRequestData launched...");

    setIsLoading(true);
    requestTokenFromFMS()
      .then((fmsResult) => {
        const theToken = fmsResult.response.token;
        console.log("cloudDataContext.onRequestData token: ", theToken);

        requestDataFromFMS(theToken)
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
                "cloudDataContext.onRequestData queryStatus: ",
                queryStatus,
                "; queryFoundCount: ",
                queryFoundCount,
                "; queryReturnedCount: ",
                queryReturnedCount
              );
              console.log(
                "cloudDataContext.onRequestData, response: ",
                scriptResult.response.data
              );

              setCloudData(scriptResult.response.data);
              //   saveProjectList(scriptResult.response.data);
            } else {
              console.log(
                "onRequestData FMS ERROR CODE: ",
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
            console.log("cloudDataContext.onRequestData error: ", err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("cloudDataContext.onRequestData error: ", err);
        if (err.messages[0].code == 502) {
          console.log(
            "cloudDataContext.onRequestData errorCode=502 routing..."
          );
          Alert.alert("Sorry but the server was too busy. Try again.");
          //   setTryingAgain(true);
          //   setTries(tries + 1);
        }
      });
  };

  // - - - - - - - - - -

  const onSendNewJoke = (scriptParams) => {
    console.log("cloudDataContext.onSendNewJoke launched...");

    setIsLoading(true);
    requestTokenFromFMS()
      .then((fmsResult) => {
        const theToken = fmsResult.response.token;
        console.log("cloudDataContext.onSendNewJoke token: ", theToken);

        const newParams = { token: theToken, params: scriptParams };
        sendNewJoke(newParams)
          .then((response) => {
            // console.log("cloudDataContext.onSendNewJoke response: ", response);
            const scriptResult = response.response.scriptResult;

            if (scriptResult === "success") {
              console.log(
                "cloudDataContext.onSendNewJoke scriptResult: ",
                scriptResult
              );

              onRequestData();
              //
            } else {
              console.log(
                "onSendNewJoke FMS ERROR CODE: ",
                scriptResult,
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
            console.log("cloudDataContext.onSendNewJoke error: ", err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("cloudDataContext.onSendNewJoke error: ", err);
        if (err.messages[0].code == 502) {
          console.log(
            "cloudDataContext.onSendNewJoke errorCode=502 routing..."
          );
          Alert.alert("Sorry but the server was too busy. Try again.");
          //   setTryingAgain(true);
          //   setTries(tries + 1);
        }
      });
  };

  // - - - - - - - - - -

  const onSendNewVote = (scriptParams) => {
    console.log("cloudDataContext.onSendNewVote launched...");

    setIsLoading(true);
    requestTokenFromFMS()
      .then((fmsResult) => {
        const theToken = fmsResult.response.token;
        console.log("cloudDataContext.onSendNewVote token: ", theToken);

        const newParams = { token: theToken, params: scriptParams };
        sendNewVote(newParams)
          .then((response) => {
            // console.log("cloudDataContext.onSendNewVote response: ", response);
            const scriptResult = response.response.scriptResult;

            if (scriptResult === "success") {
              console.log(
                "cloudDataContext.onSendNewVote scriptResult: ",
                scriptResult
              );

              Alert.alert("Vote registered.");
              // onRequestData();
              //
            } else if (scriptResult === "error: already voted") {
              console.log(
                "onSendNewVote FMS error: already voted: ",
                scriptResult
              );
              Alert.alert("Sorry, can only vote once per joke.");
              //
            } else {
              console.log(
                "onSendNewVote FMS ERROR CODE: ",
                scriptResult,
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
            console.log("cloudDataContext.onSendNewVote error: ", err);
          });
      })
      .catch((err) => {
        setIsLoading(false);
        console.log("cloudDataContext.onSendNewVote error: ", err);
        if (err.messages[0].code == 502) {
          console.log(
            "cloudDataContext.onSendNewVote errorCode=502 routing..."
          );
          Alert.alert("Sorry but the server was too busy. Try again.");
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
        onRequestData,
        onSendNewJoke,
        onSendNewVote,
      }}
    >
      {children}
    </CloudDataContext.Provider>
  );
};
