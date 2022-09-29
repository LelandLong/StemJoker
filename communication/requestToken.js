import { FMS_HOST_PCI, FMS_DB_DATASOURCE } from "../utilities/fmsKeys";

// - - - - - - - - - - - - - - - - - - - -

export const requestTokenFromFMS = () => {
  const encodedCredentials = "RGF0YUFQSV9SZWFjdE5hdGl2ZTpTbGFja2JvdFJ1bGVz";
  const dynamicBody = "{}";
  const dynamicUrl =
    "https://" +
    FMS_HOST_PCI +
    "/fmi/data/vLatest/databases/" +
    FMS_DB_DATASOURCE +
    "/sessions";

  console.log("requestTokenFromFMS dynamicUrl: ", dynamicUrl);

  // - - - - - - - - - -

  return fetch(dynamicUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Basic " + encodedCredentials,
    },
    body: dynamicBody,
  })
    .then((response) => {
      return new Promise((resolve, reject) => {
        if (response.status < 400) {
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
      console.log(
        "requestTokenFromFMS catch errorBlockString: ",
        errorBlockString
      );
      console.log("requestTokenFromFMS catch errorJson: ", error);

      return new Promise((resolve, reject) => {
        let subString = "<title>502";
        if (errorBlockString.includes(`${subString}`)) {
          console.log(
            "requestTokenFromFMS catch return Promise errorBlockString.includes('502 - Web server received ...') ..."
          );
          const composedError = {
            messages: [
              { code: 502, message: "requestTokenFromFMS catch, 502 error" },
            ],
          };
          reject(composedError);
          //
          //
        } else if (errorBlockString !== "{}") {
          const errorBlock = JSON.parse(errorBlockString);
          console.log(
            "requestTokenFromFMS catch return Promise errorBlock != {}, errorBlock: ",
            errorBlock
          );
          reject(errorBlock);
          //
          //
        } else {
          console.log(
            "requestTokenFromFMS catch return Promise errorBlock == {}"
          );
          const composedError = {
            messages: [
              {
                code: -99,
                message: "requestTokenFromFMS catch, no errorBlock",
              },
            ],
          };
          reject(composedError);
        }
      });
    });
};
