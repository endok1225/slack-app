const { App } = require('@slack/bolt');
//const fetch = require('node-fetch');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// ★ freee設定 12554244
const ACCESS_TOKEN = '12593326';
const COMPANY_ID = '33l8bplKLBynmHuFGHyLSMjimwhMdXm_9vlfxY0wUF4';

// コマンド → モーダル表示
app.command('/order2', async ({ ack, body, client }) => {
  await ack();

  await client.views.open({
    trigger_id: body.trigger_id,
    view: {
      type: 'modal',
      callback_id: 'order_modal', // ★これ重要
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

// ★ モーダル送信時
app.view('order_modal', async ({ ack, body, view }) => {
  await ack(); // ← これ最速で

  const item =
    view.state.values.item_block.item_input.value;

  console.log('入力値:', item);

  // ★ freee登録
  await fetch('https://api.freee.co.jp/api/1/deals', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      issue_date: '2026-04-07',
      type: 'expense',
      company_id: Number(COMPANY_ID),
      details: [
        {
          amount: 1000,
          account_item_id: 1,
          tax_code: 0,
          description: item // ← 商品名を使う
        }
      ]
    })
  });

  console.log('freee登録完了');
});

(async () => {
  const port = process.env.PORT || 3000;
  await app.start(port);
  console.log(`Slack app is running on port ${port}`);
})();