// 브라우저 테스트 페이지 스크립트: 버튼 클릭으로 API 호출
const out = document.getElementById('out');
document.getElementById('btnHealth').onclick = () => call('/health');
document.getElementById('btnAccounts').onclick = () => call('/accounts');
document.getElementById('btnDeposit').onclick = () => post('/deposit', {accountId: +d_id.value, amount: +d_amt.value});
document.getElementById('btnWithdraw').onclick = () => post('/withdraw', {accountId: +w_id.value, amount: +w_amt.value});
document.getElementById('btnTransfer').onclick = () => post('/transfer', {fromAccountId: +t_from.value, toAccountId: +t_to.value, amount: +t_amt.value});

// GET 호출
async function call(path) {
  const res = await fetch(path);
  const text = await res.text();
  show(res.status, text);
}

// POST 호출(JSON 바디)
async function post(path, body) {
  const res = await fetch(path, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body)
  });
  const text = await res.text();
  show(res.status, text);
}

// 응답 표시: JSON이면 예쁘게, 아니면 원문 출력
function show(status, text) {
  try {
    out.textContent = status + "\n" + JSON.stringify(JSON.parse(text), null, 2);
  } catch (e) {
    out.textContent = status + "\n" + text;
  }
}


