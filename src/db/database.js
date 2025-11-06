// DB 연결/스키마/시드 설정을 담당하는 모듈
// - 파일 기반 SQLite 사용 (data.sqlite)
// - 최초 실행 시 테이블 생성 및 기본 데이터(Alice, Bob) 시드
const Database = require('better-sqlite3');

const db = new Database('data.sqlite');
// 성능/일관성 향상을 위한 PRAGMA 설정
// WAL: 동시성 향상, foreign_keys: FK 제약 활성화, busy_timeout: 잠금 대기(ms)
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.pragma('busy_timeout = 2000');

// 스키마 생성 및 기본 데이터 시드
function ensureSchema() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      balance INTEGER NOT NULL DEFAULT 0
    );
  `);

  const row = db.prepare('SELECT COUNT(*) as count FROM accounts').get();
  if (row.count === 0) {
    // 계정이 없으면 기본 계정 2개 생성
    const insert = db.prepare('INSERT INTO accounts (name, balance) VALUES (?, ?)');
    const seed = db.transaction(() => {
      insert.run('Alice', 1000);
      insert.run('Bob', 500);
    });
    seed();
  }
}

ensureSchema();

module.exports = { db };


