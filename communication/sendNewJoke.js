import { FMS_HOST_PCI, FMS_DB_DATASOURCE } from "../utilities/fmsKeys";

// - - - - - - - - - - - - - - - - - - - -

export const sendNewJoke = (processParams) => {
  const token = processParams.token;
  const params = processParams.params;

  const dynamicUrl =
    "https://" +
    FMS_HOST_PCI +
    "/fmi/data/vLatest/databases/" +
    FMS_DB_DATASOURCE +
    "/layouts/Jokes/script/SendNewJoke?script.param=" +
    JSON.stringify(params);

  //   console.log("sendNewJoke params: ", params);

  // - - - - - - - - - -

  return fetch(dynamicUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: "",
  })
    .then((response) => {
      return new Promise((resolve, reject) => {
        const status = response.status;
        console.log(".then status: ", status);

        if (response.status < 400) {
          // the response json body is NOT available here yet evidently.
          // cannot move parsing code here successfully
          resolve(response.json());
        } else {
          response.text().then((errorMessage) => {
            reject(errorMessage);
          });
        }
      });
    })
    .catch((error) => {
      const errorBlockString = JSON.stringify(error);
      console.log("sendNewJoke catch errorBlockString: ", errorBlockString);
      console.log("sendNewJoke catch errorJson: ", error);

      return new Promise((resolve, reject) => {
        let subString = "<title>502";
        if (errorBlockString.includes(`${subString}`)) {
          console.log(
            "sendNewJoke catch return Promise errorBlockString.includes('502 - Web server received ...') ..."
          );
          const composedError = {
            messages: [
              {
                code: 502,
                message: "sendNewJoke catch, 502 error",
              },
            ],
          };
          reject(composedError);
          //
          //
        } else if (errorBlockString !== "{}") {
          const errorBlock = JSON.parse(errorBlockString);
          console.log(
            "sendNewJoke catch return Promise errorBlock != {}, errorBlock: ",
            errorBlock
          );
          reject(errorBlock);
          //
          //
        } else {
          console.log("sendNewJoke catch return Promise errorBlock == {}");
          const composedError = {
            messages: [
              {
                code: -99,
                message: "sendNewJoke catch, no errorBlock",
              },
            ],
          };
          reject(composedError);
        }
      });
    });
};
