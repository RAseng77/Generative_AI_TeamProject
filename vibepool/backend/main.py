from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from uuid import uuid4

app = FastAPI(title="VibePool Backend MVP")

# -----------------------------
# CORS 설정 (웹에서 접근 가능하도록)
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],      
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# 요청/응답 모델 정의
# -----------------------------
class MatchRequest(BaseModel):
    user_id: str
    role: str
    date: str
    time_range: str
    from_location: str
    to_location: str

class MatchCandidate(BaseModel):
    candidate_user_id: str
    nickname: str
    age_range: str
    route_summary: str
    vibe_tags: List[str]
    compatibility_score: float

class MatchResponse(BaseModel):
    request_id: str
    candidates: List[MatchCandidate]

# -----------------------------
# 목업 사용자 데이터 (MVP 버전)
# -----------------------------
MOCK_USERS = {
    "u001": {
        "nickname": "조용한직장인",
        "age_range": "20대 후반",
        "route_summary": "강남 → 판교 (출근 루트)",
        "vibe_tags": ["조용한 분위기", "비흡연", "무음 운전"],
    },
    "u002": {
        "nickname": "드라이브러버",
        "age_range": "30대 초반",
        "route_summary": "잠실 → 판교",
        "vibe_tags": ["대화 O", "신나는 음악", "운전 좋아함"],
    },
    "u003": {
        "nickname": "차분한운전자",
        "age_range": "20대 후반",
        "route_summary": "강남 → 판교",
        "vibe_tags": ["차분함", "비흡연", "발라드 선호"],
    }
}

# -----------------------------
# API 라우트
# -----------------------------
@app.get("/")
def root():
    return {"message": "VibePool backend is running."}

@app.post("/match", response_model=MatchResponse)
def create_match(req: MatchRequest):

    request_id = str(uuid4())

    candidates = []
    for user_id, info in MOCK_USERS.items():
        score = 0.9 if ("강남" in req.from_location and "판교" in req.to_location) else 0.7
        
        candidates.append(
            MatchCandidate(
                candidate_user_id=user_id,
                nickname=info["nickname"],
                age_range=info["age_range"],
                route_summary=info["route_summary"],
                vibe_tags=info["vibe_tags"],
                compatibility_score=score
            )
        )

    return MatchResponse(
        request_id=request_id,
        candidates=candidates
    )
