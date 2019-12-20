const apiai = require("apiai");

// Only for now
require("dotenv").config();
const app = apiai(process.env.DF_CLIENT_ACCESS_TOKEN);

const sendDialogFlowRequest = text => {
  return new Promise((resolve, reject) => {
    if (!text) reject("Text is empty");
    const request = app.textRequest(text, {
      sessionId: "<unique session id>"
    });

    request.on("response", response => {
      console.log(response);
      resolve(response);
    });

    request.on("error", error => {
      console.log(error);
      reject(error);
    });

    request.end();
  });
};

// sendDialogFlowRequest("Kako si?");
module.exports = sendDialogFlowRequest;
