// Service: 비즈니스 규칙/검증/트랜잭션을 담당
const { db } = require('../db/database');
const repo = require('../repositories/account.repository');

// 계정 목록 조회
function listAccounts() {
  return repo.findAll();
}

// 입금: 금액 검증, 계정 존재 확인 후 잔액 증가
function deposit(accountId, amount) {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error('INVALID_AMOUNT');
  }
  const account = repo.findById(accountId);
  if (!account) {
    throw new Error('ACCOUNT_NOT_FOUND');
  }
  repo.incrementBalance(accountId, amount);
  return repo.findById(accountId);
}

// 출금: 금액/잔액 검증 후 잔액 감소
function withdraw(accountId, amount) {
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error('INVALID_AMOUNT');
  }
  const account = repo.findById(accountId);
  if (!account) {
    throw new Error('ACCOUNT_NOT_FOUND');
  }
  if (account.balance < amount) {
    throw new Error('INSUFFICIENT_FUNDS');
  }
  repo.decrementBalance(accountId, amount);
  return repo.findById(accountId);
}

// 이체(트랜잭션): 출금 + 입금을 하나의 원자적 작업으로 수행
const transfer = db.transaction((fromAccountId, toAccountId, amount) => {
  const from = repo.findById(fromAccountId);
  const to = repo.findById(toAccountId);
  if (!from || !to) {
    throw new Error('ACCOUNT_NOT_FOUND');
  }
  if (!Number.isInteger(amount) || amount <= 0) {
    throw new Error('INVALID_AMOUNT');
  }
  if (from.balance < amount) {
    throw new Error('INSUFFICIENT_FUNDS');
  }
  repo.decrementBalance(fromAccountId, amount);
  repo.incrementBalance(toAccountId, amount);
  return {
    from: repo.findById(fromAccountId),
    to: repo.findById(toAccountId)
  };
});

module.exports = {
  listAccounts,
  deposit,
  withdraw,
  transfer
};


