from pathlib import Path  # 폴더 생성 및 경로 처리를 위한 모듈

import joblib  # 학습된 모델을 파일로 저장/불러오기 위한 라이브러리
from sklearn.datasets import load_iris  # Iris 예제 데이터셋
from sklearn.ensemble import RandomForestClassifier  # 랜덤 포레스트 분류 모델
from sklearn.model_selection import train_test_split  # 학습/테스트 데이터 분리


# 데이터 불러오기
iris = load_iris()  # Iris 데이터셋 로드

X_train, X_test, y_train, y_test = train_test_split(
    iris.data,        # 입력 특성 데이터
    iris.target,      # 정답 클래스 라벨
    test_size=0.2,    # 전체 데이터의 20%를 테스트 데이터로 사용
    random_state=42,  # 실행할 때마다 같은 데이터 분할 결과 사용
)


# 모델 학습
model = RandomForestClassifier(
    n_estimators=100,  # 결정 트리 100개를 사용
    random_state=42,   # 실행 결과 재현을 위한 랜덤 시드
)

model.fit(X_train, y_train)  # 학습 데이터로 모델 학습


# 모델 저장
Path("model").mkdir(exist_ok=True)  # model 폴더가 없으면 생성

joblib.dump(
    {
        "model": model,                              # 학습된 모델 저장
        "target_names": iris.target_names.tolist(), # 클래스 이름도 함께 저장
    },
    "model/iris_model.joblib",  # 저장할 파일 경로
)

print("모델 저장 완료")  # 저장 완료 메시지 출력