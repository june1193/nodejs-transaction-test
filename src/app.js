// Express 애플리케이션 설정(미들웨어, 정적 파일, 공용 라우트, 404)
const express = require('express');
const path = require('path');
const accountRoutes = require('./routes/account.routes');

const app = express();

// JSON 본문 파싱
app.use(express.json());
// 정적 파일 제공 (브라우저 테스트 페이지 등)
app.use(express.static(path.join(__dirname, '..', 'public')));

// 기본 유틸 라우트
app.get('/health', (req, res) => { res.json({ ok: true }); });
app.get('/', (req, res) => {
  res.json({ message: 'Transaction Test API - see /health, /accounts, POST /deposit, /withdraw, /transfer' });
});
app.get('/favicon.ico', (req, res) => { res.status(204).end(); });
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => { res.json({ ok: true }); });
app.get('/test', (req, res) => { res.sendFile(path.join(__dirname, '..', 'public', 'test.html')); });

// 도메인 라우트 마운트
app.use('/', accountRoutes);

// 404 after routes
app.use((req, res) => {
  res.status(404).json({
    error: 'NOT_FOUND',
    path: req.path,
    hint: 'Use routes below. For POST, send JSON body with Content-Type: application/json',
    routes: [
      'GET /', 'GET /health', 'GET /accounts', 'GET /test',
      'POST /deposit {accountId, amount}',
      'POST /withdraw {accountId, amount}',
      'POST /transfer {fromAccountId, toAccountId, amount}'
    ]
  });
});

module.exports = app;


