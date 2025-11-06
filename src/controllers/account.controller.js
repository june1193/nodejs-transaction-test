// Controller: HTTP 입출력과 상태코드/에러 매핑을 담당
const service = require('../services/account.service');

// GET /accounts
function getAccounts(req, res) {
  res.json({ accounts: service.listAccounts() });
}

// POST /deposit { accountId, amount }
function postDeposit(req, res) {
  try {
    const { accountId, amount } = req.body || {};
    const account = service.deposit(Number(accountId), Number(amount));
    res.json({ account });
  } catch (err) {
    handleError(res, err);
  }
}

// POST /withdraw { accountId, amount }
function postWithdraw(req, res) {
  try {
    const { accountId, amount } = req.body || {};
    const account = service.withdraw(Number(accountId), Number(amount));
    res.json({ account });
  } catch (err) {
    handleError(res, err);
  }
}

// POST /transfer { fromAccountId, toAccountId, amount }
function postTransfer(req, res) {
  try {
    const { fromAccountId, toAccountId, amount } = req.body || {};
    const result = service.transfer(Number(fromAccountId), Number(toAccountId), Number(amount));
    res.json({ transfer: result });
  } catch (err) {
    handleError(res, err);
  }
}

// 도메인 에러를 HTTP 상태코드로 변환
function handleError(res, err) {
  const codeMap = {
    INVALID_AMOUNT: 400,
    ACCOUNT_NOT_FOUND: 404,
    INSUFFICIENT_FUNDS: 400
  };
  const httpCode = codeMap[err.message] || 500;
  res.status(httpCode).json({ error: err.message || 'INTERNAL_ERROR' });
}

module.exports = {
  getAccounts,
  postDeposit,
  postWithdraw,
  postTransfer
};


