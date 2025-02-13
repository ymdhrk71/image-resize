const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, 初めての個人開発！');
});

app.listen(3000, () => {
  console.log('サーバーが http://localhost:3000 で起動しました');
});
