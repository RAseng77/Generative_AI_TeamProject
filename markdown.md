
# VibePool Web MVP – Final Specification (PRD + Architecture + UI/UX)

## 1. 프로젝트 개요

- **프로젝트명:** VibePool – AI 기반 성향 매칭 카풀 서비스  
- **핵심 컨셉:** 위치·시간뿐 아니라 **심리적·성향적 궁합까지 고려한 웹 기반 카풀 매칭 서비스**  
- **플랫폼:** 모바일 앱이 아닌 **웹 기반(SPA 스타일)** → 이후 앱뷰어(WebView)로 감싸 앱처럼 제공  
- **타겟 사용자:** 출퇴근 카풀을 원하는 20–40대 직장인 / 안전·편안함·성향 맞춤형 이동을 원하는 사용자  

---

## 2. 문제 정의 & 솔루션

### 2.1 문제점
- 기존 카풀 앱은 시간·위치 중심 → **탑승자 간 불일치 문제 증가**
- 대화/음악/흡연 여부 등 **비정형적 성향 데이터 미반영**
- 신규 사용자에게 **낯선 사람과 이동한다는 심리적 부담**
- 사용자 피드백을 통한 **매칭 고도화 부족**

### 2.2 솔루션
- **AI 인터뷰 기반 성향 분석 → 벡터화 → 유사도 매칭**
- 직관적인 모바일 친화 웹 UI로 누구나 쉽게 접근 가능
- 피드백 기반 지속적 추천 품질 개선

---

## 3. 핵심 기능 (MVP 기준)

### P0 (핵심 기능)
1. **웹 폼 기반 매칭 요청 UI**
2. **FastAPI 기반 성향 매칭 알고리즘**
3. **추천 카드 UI 출력**
4. **간단한 피드백 기능(추가기능)**

### P1 (향후 확장)
- LLM 기반 인터뷰 챗봇
- 사용자 프로필 저장(DB)
- 위치 기반 경로 유사도 분석
- 신뢰도 점수 & 평판 모델
- 예약/결제 기능

---

## 4. 전체 시스템 구조 (초반)

```
사용자 브라우저  
     ↓  
index.html + app.js  
     ↓ fetch API  
FastAPI Backend  
     ↓  
Mock DB → 이후 Firestore/Supabase로 확장
```

---

## 5. 프론트엔드 (웹 기반)

### 기술 스택
- **HTML + CSS + JavaScript (Vanilla JS)**
    - 설치 필요 없음
    - FastAPI와 fetch로 직접 통신
- **선택적 확장: React + Vite + TypeScript**
    - SPA 구축 및 컴포넌트 기반 UI에 적합
    - PWA 확장 가능

### 웹을 선택한 이유
- 개발 속도 빠름
- 링크만 공유해도 바로 사용 가능
- 모바일 앱(WebView)로 전환 쉬움

---

## 6. 백엔드 (FastAPI)

- `/match` 엔드포인트 제공
- 입력값 → 추천 후보 생성
- 현재는 Mock 데이터 기반 추천
- 추후 Sentence Transformers 임베딩 + FAISS KNN 적용 가능

---

## 7. 데이터 모델 명세

### MatchRequest
```
{
  user_id: str,
  role: str,
  date: str,
  time_range: str,
  from_location: str,
  to_location: str
}
```

### MatchCandidate
```
{
  candidate_user_id: str,
  nickname: str,
  age_range: str,
  route_summary: str,
  vibe_tags: [str],
  compatibility_score: float
}
```

---

## 8. UI/UX 요구사항

### 디자인 Vibe
- **신뢰 + 편안함 + 깔끔함**
- 컬러: Navy(#1d3557), White, Off-White
- 카드형 UI + 큰 버튼

### UX 원칙
- 입력 최소화
- 버튼 클릭 1번으로 추천 결과 출력
- 모바일에서도 가독성 유지

---

## 9. MVP 개발 로드맵

| 단계 | 기간 | 목표 |
|------|------|------|
| 1단계 | 1–2일 | 웹 UI(index.html + JS) 구축 |
| 2단계 | 1일 | FastAPI 연동 |
| 3단계 | 1–2일 | 카드 UI 완성 |
| 4단계 | 3일 | 인터뷰(LLM) 프로토타입 |
| 5단계 | 향후 | DB + GPS + 신뢰도 모델 확장 |

---

## 10. 실행 방법

### 1) 백엔드 실행
```
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

### 2) 웹 실행

### (권장) Live Server
1. VS Code에서 index.html 열기  
2. 오른쪽 클릭 → **Open with Live Server**  
3. 자동으로 브라우저 실행

### (대안) Python 서버
```
cd web
python -m http.server 5500
```
브라우저에서:
```
http://127.0.0.1:5500/index.html
```

---

## 11. 결론

VibePool 웹 기반 MVP는  
- **단순/빠름/접근성 뛰어남**
- AI 강화 확장성 우수  
- 모바일 WebView 전환 가능  
- 초기 사용자 피드백 수집에 최적

웹 → 앱뷰어 → 네이티브 앱 순으로 확장 가능한  
가볍고 실용적인 AI 카풀 매칭 MVP 구조를 갖추고 있다.

