const apiai = require("apiai");

// Only for now
require("dotenv").config();
const app = apiai(process.env.DF_CLIENT_ACCESS_TOKEN);

// console.log(delta(100000, 25000));

const handleResponse = ({ result: { action, fulfillment, parameters } }) => {
  const { speech, messages } = fulfillment;
  console.log(`🉑 Action: ${action}`);
  console.log(`🗯️Fulfilment: ${speech}`);

  return {
    action,
    response: speech,
    parameters
  };
};

const sendDialogFlowRequest = text => {
  return new Promise((resolve, reject) => {
    if (!text) reject("Text is empty");
    const request = app.textRequest(text, {
      sessionId: "<unique session id>"
    });

    request.on("response", response => {
      resolve(handleResponse(response));
    });

    request.on("error", error => {
      console.log(error);
      reject(error);
    });

    request.end();
  });
};

// sendDialogFlowRequest("Kako si?").then(r => console.log(r));
module.exports = sendDialogFlowRequest;
