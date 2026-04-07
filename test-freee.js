const fetch = require('node-fetch');

const ACCESS_TOKEN = 'ここにトークン';
const COMPANY_ID = 'ここにcompany_id';

async function createDeal() {
  const res = await fetch('https://api.freee.co.jp/api/1/deals', {
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
          account_item_id: 1, // とりあえず適当（あとで直す）
          tax_code: 0,
          description: 'テスト発注'
        }
      ]
    })
  });

  const data = await res.json();
  console.log(data);
}

createDeal();