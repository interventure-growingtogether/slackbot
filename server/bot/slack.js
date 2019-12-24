const { App } = require("@slack/bolt");
const sendDialogFlowRequest = require("./dialogflow");
require("dotenv").config();
const SLACK_PORT = process.env.SLACK_PORT || 8080;

const delta = (bruto, tax) => {
  const neto1 = bruto - tax;
  const neto2 = 0.88667 * bruto;
  return neto1 - neto2;
};

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

/* Add functionality here */

app.error(error => {
  console.error("IIII", error);
});

const sendImage = (url, alt) => {
  return {
    type: "image",
    image_url: url,
    alt_text: alt
  };
};

const draganaImage =
  "https://ca.slack-edge.com/T3UBZ29MM-UACGJQV36-6a733a63889d-512";

app.event("message", async ({ say, message }) => {
  try {
    const { text, user } = message;

    const result = await sendDialogFlowRequest(text);
    const { action, response, parameters } = result;
    console.log("🔥 ", action, response);
    console.log(parameters);
    console.log(`User 🆔 : ${user}`);
    // "context", "next", "body", "payload", "event", "message", "say";
    console.log(response);
    switch (action) {
      case "catering":
        const gagaImage = sendImage(draganaImage, "atl text");

        say(`Gaga: ${response}`);
        say({
          blocks: [gagaImage]
        });
        break;
      case "delta":
        const deltaValue = delta(parameters.number, parameters.number1);
        say(`${response} ${deltaValue} RSD`);
        break;
      case "salary":
        say(response);
        const moneyImage = sendImage(
          "https://media.tenor.com/images/38335d674724c77c087bf1140d54d7cf/tenor.gif",
          "alt"
        );
        say({ blocks: [moneyImage] });
        break;
      case "win":
        say("Analyzing...");
        setTimeout(() => {
          say(`${response}`);
        }, 2000);
        break;
      case "input.unknown":
        console.log("JOCA SISA ");
        const whatImage = sendImage(
          "https://media.giphy.com/media/gKSwiJKM3ABYK0RLVr/giphy.gif",
          "alt"
        );
        console.log(whatImage);
        say({ blocks: [whatImage] });

        break;
      default:
        say(`📣 ${response}`);
        break;
    }
    // say("https://files.slack.com/files-pri/T3UBZ29MM-FRK2QN334/img_3742.jpg");
    // say({
    //   blocks: [
    //     {
    //       type: "section",
    //       text: {
    //         type: "mrkdwn",
    //         text: "Pick a date for me to remind you"
    //       },
    //       accessory: {
    //         type: "datepicker",
    //         action_id: "datepicker_remind",
    //         initial_date: "2019-12-12",
    //         placeholder: {
    //           type: "plain_text",
    //           text: "Select a date"
    //         }
    //       }
    //     }
    //   ]
    // });
    // const result = await app.client.chat.postMessage({
    //   token: context.botToken,
    //   channel: welcomeChannelId,
    //   text: `Welcome to the team, <@${event.user.id}>! 🎉 You can introduce yourself in this channel.`
    // });
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start the app
  console.log("IDEMOOO");
  await app.start(SLACK_PORT);

  console.log(`⚡️ Bolt app is running on port ${SLACK_PORT}`);
})();
