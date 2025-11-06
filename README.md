# 트랜잭션 테스트 API (Node.js + Express + SQLite)

간단한 계좌 입출금/이체 API.

## SQLite 간략 설명
- 파일 기반 RDBMS로, 별도의 DB 서버 없이 애플리케이션이 파일(`data.sqlite`)을 직접 읽고 씀.

## 엔드포인트 설명
- GET /health: 서버 상태 확인. 응답 예) { ok: true }
- GET /accounts: 모든 계정과 현재 잔액 목록 반환.
- POST /deposit: 입금.
- POST /withdraw: 출금.
- POST /transfer: 이체. [출금 + 입금을 하나의 트랜잭션으로 묶어 원자적으로 실행]
<br><br>
- 현재 코드에서 명시적 트랜잭션은 transfer에만 적용.
- deposit/withdraw는 각각 단일 UPDATE(원자적)로 처리.

