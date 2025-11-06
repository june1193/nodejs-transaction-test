// 서버 시작 전용 파일: app 생성은 src/app.js에서 담당
const app = require('./src/app');

// PORT 환경변수가 있으면 사용, 없으면 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});


