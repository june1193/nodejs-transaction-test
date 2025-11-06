// Routes: URL 경로를 컨트롤러에 매핑
const { Router } = require('express');
const ctrl = require('../controllers/account.controller');

const router = Router();

// 브라우저 주소창으로 잘못 접근했을 때 안내(POST 전용)
router.get('/deposit', (req, res) => {
  res.status(405).json({ error: 'Use POST with JSON body {accountId, amount}' });
});
router.get('/withdraw', (req, res) => {
  res.status(405).json({ error: 'Use POST with JSON body {accountId, amount}' });
});
router.get('/transfer', (req, res) => {
  res.status(405).json({ error: 'Use POST with JSON body {fromAccountId, toAccountId, amount}' });
});

// 실제 API 라우트
router.get('/accounts', ctrl.getAccounts);
router.post('/deposit', ctrl.postDeposit);
router.post('/withdraw', ctrl.postWithdraw);
router.post('/transfer', ctrl.postTransfer);

module.exports = router;


