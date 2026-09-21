from pathlib import Path  # 파일 경로를 안전하게 처리하기 위한 모듈

import joblib  # 저장된 머신러닝 모델을 불러오기 위한 라이브러리
from fastapi import FastAPI  # FastAPI 웹 API 서버 생성
from pydantic import BaseModel  # 요청 데이터 형식 및 타입 검증


app = FastAPI(
    title="Iris Prediction API"  # API 문서에 표시할 서비스 이름
)


# 모델 불러오기
BASE_DIR = Path(__file__).resolve().parent.parent
# 현재 파일 위치를 기준으로 프로젝트 최상위 경로 계산

model_bundle = joblib.load(
    BASE_DIR / "model" / "iris_model.joblib"
)  # 저장된 모델 파일 불러오기

model = model_bundle["model"]                # 학습된 RandomForest 모델 추출
target_names = model_bundle["target_names"]  # 클래스 이름 목록 추출


# 입력 데이터 형식 정의
class IrisInput(BaseModel):
    sepal_length: float  # 꽃받침 길이
    sepal_width: float   # 꽃받침 너비
    petal_length: float  # 꽃잎 길이
    petal_width: float   # 꽃잎 너비


@app.get("/")
def root():
    # API 기본 주소 접속 시 간단한 메시지 반환
    return {
        "message": "Iris Prediction API"
    }


@app.get("/health")
def health():
    # 서버가 정상 동작하는지 확인하는 상태 체크 API
    return {
        "status": "ok"
    }


@app.post("/predict")
def predict(data: IrisInput):
    # 요청받은 4개의 특성값을 모델 입력 형태인 2차원 리스트로 변환
    features = [[
        data.sepal_length,
        data.sepal_width,
        data.petal_length,
        data.petal_width,
    ]]

    # 모델 예측 결과에서 첫 번째 클래스 번호 추출
    prediction = int(
        model.predict(features)[0]
    )

    # 예측 클래스 번호와 해당 품종 이름 반환
    return {
        "prediction": prediction,
        "class_name": target_names[prediction],
    }