const { App } = require("@slack/bolt");

require("dotenv").config();
const SLACK_PORT = process.env.SLACK_PORT || 8080;

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

/* Add functionality here */

app.error(error => {
  console.error(error);
});

const sendImage = (url, alt) => {
  return {
    type: "image",
    image_url: url,
    alt_text: alt
  };
};

app.event("message", async ({ say, message }) => {
  try {
    const { text, user } = message;

    console.log(`User 🆔 : ${user}`);
    const image = sendImage("http://placekitten.com/700/500", "atl text");
    // "context", "next", "body", "payload", "event", "message", "say";
    say(`📣 ${text}`);
    say({
      blocks: [image]
    });
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
  await app.start(SLACK_PORT);

  console.log(`⚡️ Bolt app is running on port ${SLACK_PORT}`);
})();
