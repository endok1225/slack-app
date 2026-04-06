const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

app.command('/order', async ({ ack, body, client }) => {
  await ack();

  await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      type: 'modal',
      title: {
        type: 'plain_text',
        text: '発注フォーム'
      },
      blocks: [
        {
          type: 'input',
          block_id: 'item_block',
          label: {
            type: 'plain_text',
            text: '商品名'
          },
          element: {
            type: 'plain_text_input',
            action_id: 'item_input'
          }
        }
      ],
      submit: {
        type: 'plain_text',
        text: '送信'
      }
    }
  });
});

(async () => {
  await app.start(3000);
  console.log('⚡️ Slack app is running!');
})();