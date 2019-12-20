const { App } = require("@slack/bolt");

require("dotenv").config();

const app = new App({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  token: process.env.SLACK_BOT_TOKEN
});

/* Add functionality here */

app.error(error => {
  // Check the details of the error to handle cases where you should retry sending a message or stop the app
  console.error(error);
});

app.event("message", async ({ say, message }) => {
  try {
    // "context", "next", "body", "payload", "event", "message", "say";
    const { text } = message;
    say(`Echo: ${text}`);
    say({
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Pick a date for me to remind you"
          },
          accessory: {
            type: "datepicker",
            action_id: "datepicker_remind",
            initial_date: "2019-12-12",
            placeholder: {
              type: "plain_text",
              text: "Select a date"
            }
          }
        }
      ]
    }); // const result = await app.client.chat.postMessage({
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
  await app.start(process.env.PORT || 8080);

  console.log("⚡️ Bolt app is running!");
})();
