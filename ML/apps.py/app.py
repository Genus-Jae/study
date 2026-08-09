import streamlit as st
import pandas as pd
import joblib

# 1. 페이지 설정
st.set_page_config(page_title="롤 승리 예측 웹 서비스", layout="wide")

# 2. 저장된 파일들 불러오기 (말자하 궁극기 장착)
@st.cache_resource
def load_artifacts():
    model = joblib.load('best_model.pkl')
    scaler = joblib.load('scaler.pkl')
    X_columns = joblib.load('x_columns.pkl')
    return model, scaler, X_columns

model, scaler, X_columns = load_artifacts()

# 3. 웹 UI 디자인
st.title("⚔️ 롤(League of Legends) 블루팀 승리 예측 서비스")
st.write("사이드바에 10분 지표를 입력하고 예측 버튼을 눌러보세요!")

# 4. 사이드바에 입력창 동적 생성 (저장해 둔 컬럼명 기준)
st.sidebar.header("📊 게임 지표 입력")
input_data = {}
for col in X_columns:
    input_data[col] = st.sidebar.number_input(col, value=0.0)

# 5. 메인 화면 예측 로직
if st.button("승리 예측 실행 "):
    # 입력값을 데이터프레임으로 변환
    input_df = pd.DataFrame([input_data])

    # 스케일링 및 모델 추론
    scaled_data = scaler.transform(input_df)
    prediction = model.predict(scaled_data)
    probability = model.predict_proba(scaled_data)

    # 결과 시각화 출력
    col1, col2 = st.columns(2)
    with col1:
        win_result = "블루팀 승리 🏆" if prediction[0] == 1 else "블루팀 패배 💀"
        st.metric(label="예측 결과", value=win_result)
    with col2:
        confidence = max(probability[0]) * 100
        st.metric(label="AI 확신도", value=f"{confidence:.2f}%")

    st.success("추론 완료!")
