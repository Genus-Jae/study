from fastapi.testclient import TestClient  # FastAPI API 테스트용 클라이언트

from app.main import app  # 테스트할 FastAPI 애플리케이션 불러오기


client = TestClient(app)  # 실제 서버 실행 없이 API 요청을 보내는 테스트 클라이언트 생성


def test_root():
    # 루트("/") API에 GET 요청
    response = client.get("/")

    # HTTP 상태 코드가 정상 응답(200)인지 확인
    assert response.status_code == 200

    # 반환된 JSON 데이터가 예상 결과와 같은지 확인
    assert response.json() == {
        "message": "Iris Prediction API"
    }


def test_health():
    # 서버 상태 확인 API에 GET 요청
    response = client.get("/health")

    # HTTP 상태 코드가 정상 응답(200)인지 확인
    assert response.status_code == 200

    # 응답 데이터의 status 값이 "ok"인지 확인
    assert response.json()["status"] == "ok"