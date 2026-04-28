const { App } = require('@slack/bolt');
//const fetch = require('node-fetch');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// ★ freee設定 12554244
const ACCESS_TOKEN = '33l8bplKLBynmHuFGHyLSMjimwhMdXm_9vlfxY0wUF4';
const COMPANY_ID = '12593326';
app.command('/order2', async ({ ack, body, respond }) => {
  await ack();
console.log("channel_id:", body.channel_id);
console.log("user_id:", body.user_id);
console.log("channel_name:", body.channel_name);

  await respond({
    response_type: 'ephemeral',
    text: '発注メニュー',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*発注メニューを選択してください*'
        }
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: '業務委託' },
            url: 'https://localhost:7187/'
          },
          {
            type: 'button',
            text: { type: 'plain_text', text: '紙発注' },
            url: 'https://localhost:7187/Order/Index'
          },
          {
            type: 'button',
            text: { type: 'plain_text', text: '製版' },
            url: 'https://www.bing.com'
          }
        ]
      }
    ]
  });
});
(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);
  console.log(`Slack app is running on port ${port}`);
})();