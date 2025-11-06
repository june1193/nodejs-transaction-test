// Repository: 순수 DB 접근(쿼리 실행)만 담당
const { db } = require('../db/database');

// 모든 계정 조회
function findAll() {
  return db.prepare('SELECT id, name, balance FROM accounts ORDER BY id').all();
}

// 단일 계정 조회
function findById(accountId) {
  return db.prepare('SELECT id, name, balance FROM accounts WHERE id = ?').get(accountId);
}

// 잔액 증가 (입금)
function incrementBalance(accountId, amount) {
  return db.prepare('UPDATE accounts SET balance = balance + ? WHERE id = ?').run(amount, accountId);
}

// 잔액 감소 (출금)
function decrementBalance(accountId, amount) {
  return db.prepare('UPDATE accounts SET balance = balance - ? WHERE id = ?').run(amount, accountId);
}

module.exports = {
  findAll,
  findById,
  incrementBalance,
  decrementBalance
};


