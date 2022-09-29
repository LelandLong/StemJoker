import { FMS_HOST_PCI, FMS_DB_DATASOURCE } from "../utilities/fmsKeys";

// - - - - - - - - - - - - - - - - - - - -

export const requestLogoutFromFMS = (token) => {
  const dynamicUrl =
    "https://" +
    FMS_HOST_PCI +
    "/fmi/data/vLatest/databases/" +
    FMS_DB_DATASOURCE +
    "/sessions/" +
    token;

  console.log("requestLogoutFromFMS dynamicUrl: ", dynamicUrl);

  // - - - - - - - - - -

  return fetch(dynamicUrl, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
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
        "requestLogoutFromFMS catch errorBlockString: ",
        errorBlockString
      );

      return new Promise((resolve, reject) => {
        let subString = "<title>502";
        if (errorBlockString.includes(`${subString}`)) {
          console.log(
            "requestLogoutFromFMS catch return Promise errorBlockString.includes('502 - Web server received ...') ..."
          );
          const composedError = {
            messages: [
              { code: 502, message: "requestLogoutFromFMS catch, 502 error" },
            ],
          };
          reject(composedError);
          //
          //
        } else if (errorBlockString !== "{}") {
          const errorBlock = JSON.parse(errorBlockString);
          console.log(
            "requestLogoutFromFMS catch return Promise errorBlock != {}, errorBlock: ",
            errorBlock
          );
          reject(errorBlock);
          //
          //
        } else {
          console.log(
            "requestLogoutFromFMS catch return Promise errorBlock == {}"
          );
          const composedError = {
            messages: [
              {
                code: -99,
                message: "requestLogoutFromFMS catch, no errorBlock",
              },
            ],
          };
          reject(composedError);
        }
      });
    });
};
