// 백엔드 FastAPI 서버 주소
const API_BASE = "http://127.0.0.1:8000";

const matchBtn = document.getElementById("matchBtn");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");
const roleSelect = document.getElementById("role");
const fromInput = document.getElementById("from");
const toInput = document.getElementById("to");
const dateInput = document.getElementById("date");
const timeRangeSelect = document.getElementById("timeRange");

// 기본값: 오늘 날짜로 설정
dateInput.valueAsNumber =
  Date.now() - new Date().getTimezoneOffset() * 60 * 1000;

// 매칭 버튼 클릭 핸들러
async function callMatch() {
  const role = roleSelect.value;
  const from = fromInput.value.trim();
  const to = toInput.value.trim();
  const date = dateInput.value;
  const timeRange = timeRangeSelect.value;

  if (!from || !to || !date) {
    alert("출발지, 도착지, 날짜를 모두 입력해주세요.");
    return;
  }

  matchBtn.disabled = true;
  statusEl.textContent = "매칭 요청 중...";
  resultsEl.textContent = "";

  const payload = {
    user_id: "me", // MVP 단계에서는 고정값
    role: role,
    date: date,
    time_range: timeRange,
    from_location: from,
    to_location: to,
  };

  try {
    const res = await fetch(`${API_BASE}/match`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      statusEl.textContent = `매칭 실패: HTTP ${res.status}`;
      resultsEl.textContent = "에러가 발생했습니다.";
      return;
    }

    const data = await res.json();
    statusEl.textContent = `요청 ID: ${data.request_id}`;

    const candidates = data.candidates || [];
    if (candidates.length === 0) {
      resultsEl.textContent = "추천 동승자가 없습니다.";
      return;
    }

    // 결과 렌더링
    resultsEl.innerHTML = "";
    candidates.forEach((c) => {
      const div = document.createElement("div");
      div.className = "candidate-card";

      const tags = (c.vibe_tags || []).join(" · ");
      const score = Math.round((c.compatibility_score || 0) * 100);

      div.innerHTML = `
        <div class="candidate-name">${c.nickname} (${c.age_range})</div>
        <div class="candidate-route">${c.route_summary || ""}</div>
        <div class="candidate-tags">${tags}</div>
        <div class="candidate-score">궁합 지수: ${score}%</div>
      `;
      resultsEl.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    statusEl.textContent = "요청 중 오류가 발생했습니다.";
    resultsEl.textContent = String(err);
  } finally {
    matchBtn.disabled = false;
  }
}

matchBtn.addEventListener("click", callMatch);
