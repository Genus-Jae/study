# 기본 데이터 처리 및 시각화 라이브러리
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 한글 폰트 설정 (Mac은 AppleGothic)
plt.rcParams["font.family"] = "Malgun Gothic"

# 마이너스 기호 깨짐 방지
plt.rcParams["axes.unicode_minus"] = False

# 전처리 관련 라이브러리
from sklearn.preprocessing import LabelEncoder  # 범주형 변수 숫자로 변환
from sklearn.impute import SimpleImputer        # 결측치 대체

# 분류 모델 라이브러리
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier     # KNN
from sklearn.tree import DecisionTreeClassifier
from xgboost import XGBClassifier  # XGBoost

# 데이터 분할 / 하이퍼파라미터 튜닝
from sklearn.model_selection import train_test_split, RandomizedSearchCV

# 데이터 읽어오기
df = pd.read_csv('data\high_diamond_ranked_10min.csv', encoding='utf-8', encoding_errors='ignore')

df.head()

df.info()

df.describe()

df.shape

df.isnull().sum()         # 결측치 없음

df.duplicated().sum() # 중복값 확인 # 중복된 데이터 없음

win_rate = df['blueWins'].value_counts(normalize=True)

win_rate

blue_win_rate = df['blueWins'].mean() * 100
red_win_rate = (1 - df['blueWins'].mean()) * 100

print(f"블루팀의 승률은 {blue_win_rate:.2f}%입니다.")
print(f"레드팀의 승률은 {red_win_rate:.2f}%입니다.")

import matplotlib.pyplot as plt
import seaborn as sns

# 승률 계산 
blue_win_rate = df['blueWins'].mean() * 100  # 미세하게 높음
red_win_rate = (1 - df['blueWins'].mean()) * 100   # 미세하게 낮음
teams = ['Blue Team', 'Red Team']
win_rates = [blue_win_rate, red_win_rate]

# 막대그래프 그리기
plt.figure(figsize=(6, 4))
sns.barplot(x=teams, y=win_rates, palette=['blue', 'red'])

# 핵심: Y축 범위를 50% 근처로 좁혀서 차이를 극대화
plt.ylim(49, 51) 

plt.title('Win Rate Comparison')
plt.ylabel('Win Rate (%)')
# Y축 눈금도 더 세밀하게 표시
plt.yticks([49.5, 49.75, 50, 50.25, 50.5])

plt.show()

# X값 y값 설정
factors = ['blueWardsPlaced', 
           'blueWardsDestroyed', 
           'blueFirstBlood', 
           'blueKills', 
           'blueDeaths',
           'blueAssists',
           'blueGoldDiff',
           'blueExperienceDiff'
           ]
X = df[factors]
y = df['blueWins']

import matplotlib.pyplot as plt
import seaborn as sns

# X와 y를 합쳐서 전체 상관관계 계산
df_corr = X.copy()
df_corr['blueWins'] = y

# 히트맵 그리기
plt.figure(figsize=(10, 8))
sns.heatmap(df_corr.corr(), annot=True, fmt='.2f', cmap='coolwarm', linewidths=0.5)

plt.title('Feature Correlation Heatmap')
plt.show()

# X와 y를 합친 데이터프레임에서 승패와의 상관관계만 추출 후 내림차순 정렬
df_corr = X.copy()
df_corr['blueWins'] = y

correlation_result = df_corr.corr()['blueWins'].sort_values(ascending=False)
print(correlation_result)

import matplotlib.pyplot as plt
import seaborn as sns

# 상관관계 데이터 준비
corr_target = correlation_result.drop('blueWins')

plt.figure(figsize=(10, 6))

# 색상 리스트 생성
colors = ['#1f77b4' if v > 0 else '#d62728' for v in corr_target.values]

# 핵심: x와 y를 명확히 지정하고 데이터프레임 형태나 시리즈로 전달
sns.barplot(x=corr_target.values, y=corr_target.index, palette=colors)

plt.title('Feature Correlation with Blue Team Win')
plt.xlabel('Correlation Coefficient')
plt.ylabel('Features') # Y축
plt.axvline(x=0, color='black', linewidth=0.5)

plt.show()

import matplotlib.pyplot as plt
import seaborn as sns

# X와 y를 합쳐서 전체 데이터프레임 구성
df_eda = X.copy()
df_eda['blueWins'] = y

# 히스토그램을 그릴 컬럼 개수에 맞춰 서브플롯 크기 자동 조절 (말자하 궁극기처럼 깔끔하게 배치)
fig, axes = plt.subplots(nrows=3, ncols=3, figsize=(15, 12))
axes = axes.flatten()

# 각 특성별로 히스토그램 그리기
for i, col in enumerate(df_eda.columns):
    sns.histplot(data=df_eda, x=col, hue='blueWins', kde=True, ax=axes[i], palette='coolwarm')
    axes[i].set_title(f'Distribution of {col}')
    axes[i].set_xlabel('')

plt.tight_layout()
plt.show()

# 결측치 확인 및 제거 
print(df.isnull().sum())
df = df.dropna()

# 와드 관련 컬럼의 기술 통계량 확인 
print(df[['blueWardsPlaced', 'blueWardsDestroyed']].describe())

# blueWardsPlaced 컬럼을 기준으로 IQR 계산
Q1 = df['blueWardsPlaced'].quantile(0.25)
Q3 = df['blueWardsPlaced'].quantile(0.75)
IQR = Q3 - Q1

# 정상 범위 설정
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# 정상 범위 내의 데이터만 남기기 (이상치 컷트)
df = df[(df['blueWardsPlaced'] >= lower_bound) & (df['blueWardsPlaced'] <= upper_bound)]

print(df[['blueWardsPlaced', 'blueWardsDestroyed']].describe())


# 이상치 제거 후 와드 설치 개수 분포 재확인
plt.figure(figsize=(8, 5))
sns.histplot(data=df, x='blueWardsPlaced', hue='blueWins', kde=True, palette='coolwarm')

plt.title('Re-checked Distribution of blueWardsPlaced (After IQR)')
plt.xlabel('blueWardsPlaced')
plt.show()

# blueWardsDestroyed 컬럼을 기준으로 IQR 계산
Q1_dest = df['blueWardsDestroyed'].quantile(0.25)
Q3_dest = df['blueWardsDestroyed'].quantile(0.75)
IQR_dest = Q3_dest - Q1_dest

# 정상 범위 설정
lower_bound_dest = Q1_dest - 1.5 * IQR_dest
upper_bound_dest = Q3_dest + 1.5 * IQR_dest

# 정상 범위 내의 데이터만 남기기
df = df[(df['blueWardsDestroyed'] >= lower_bound_dest) & (df['blueWardsDestroyed'] <= upper_bound_dest)]

import matplotlib.pyplot as plt
import seaborn as sns

plt.figure(figsize=(8, 5))
sns.histplot(data=df, x='blueWardsDestroyed', hue='blueWins', kde=True, palette='coolwarm')

plt.title('Re-checked Distribution of blueWardsDestroyed (After IQR)')
plt.xlabel('blueWardsDestroyed')
plt.show()

from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)
print(len(X_train), len(X_test), len(y_train), len(y_test))

from sklearn.preprocessing import StandardScaler

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

from sklearn.metrics import (
    accuracy_score, f1_score, precision_score, recall_score,
    confusion_matrix, classification_report
)

from sklearn.linear_model import LogisticRegression

# 모델 선언 
lr = LogisticRegression(random_state=42, max_iter = 1000)

# 학습 데이터로 훈련시키기
lr.fit(X_train_scaled, y_train)

print("학습 완료")

# 2. 예측 및 정확도 확인 
y_pred = lr.predict(X_test_scaled)
print(f"모델 정확도: {accuracy_score(y_test, y_pred):.4f}")
print("\n분류 보고서:\n", classification_report(y_test, y_pred))

from sklearn.metrics import (
    accuracy_score, f1_score, precision_score, recall_score,
    confusion_matrix, classification_report
)
import matplotlib.pyplot as plt
import seaborn as sns

# LogisticRegression 모델 정의 및 학습 (반복 1000번)
lr = LogisticRegression(random_state=42, max_iter=1000)
lr.fit(X_train_scaled, y_train)

y_pred_train = lr.predict(X_train_scaled)
y_pred = lr.predict(X_test_scaled)

print(f"학습 데이터셋 정확도 : {accuracy_score(y_pred_train, y_train)}")
print(f"학습 데이터셋 정밀도 : {precision_score(y_pred_train, y_train)}")
print(f"학습 데이터셋 재현율 : {recall_score(y_pred_train, y_train)}")
print(f"학습 데이터셋 F1-Score : {f1_score(y_pred_train, y_train)}")
print("-------------------")
print(f"테스트 데이터셋 정확도 : {accuracy_score(y_pred, y_test)}")
print(f"테스트 데이터셋 정밀도 : {precision_score(y_pred, y_test)}")
print(f"테스트 데이터셋 재현율 : {recall_score(y_pred, y_test)}")
print(f"테스트 데이터셋 F1-Score : {f1_score(y_pred, y_test)}")

cm = confusion_matrix(y_test, y_pred)

plt.figure(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.xlabel('정답 예측')
plt.ylabel('실제 정답')
plt.title('Logistic Regression 혼동행렬')
plt.show()

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score, f1_score, precision_score, recall_score,
    confusion_matrix, classification_report
)
import matplotlib.pyplot as plt
import seaborn as sns

# RandomForestClassifier 모델 정의 및 학습
rfc = RandomForestClassifier(random_state=42)
rfc.fit(X_train, y_train)

y_pred_train = rfc.predict(X_train)
y_pred = rfc.predict(X_test)

print(f"학습 데이터셋 정확도 : {accuracy_score(y_pred_train, y_train)}")
print(f"학습 데이터셋 정밀도 : {precision_score(y_pred_train, y_train)}")
print(f"학습 데이터셋 재현율 : {recall_score(y_pred_train, y_train)}")
print(f"학습 데이터셋 F1-Score : {f1_score(y_pred_train, y_train)}")
print("-------------------")
print(f"테스트 데이터셋 정확도 : {accuracy_score(y_pred, y_test)}")
print(f"테스트 데이터셋 정밀도 : {precision_score(y_pred, y_test)}")
print(f"테스트 데이터셋 재현율 : {recall_score(y_pred, y_test)}")
print(f"테스트 데이터셋 F1-Score : {f1_score(y_pred, y_test)}")

# 만약 le(LabelEncoder)를 사용하지 않았다면 labels 변수 처리 필요
# labels = le.classes_ 생략 시 xticklabels와 yticklabels 인자 제거 가능
cm = confusion_matrix(y_test, y_pred)

plt.figure(figsize=(6, 5))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
plt.xlabel('정답 예측')
plt.ylabel('실제 정답')
plt.title('RandomForestClassifier 혼동행렬')
plt.show()

from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

# 1. 튜닝할 하이퍼파라미터 후보군 설정 
param_grid = {
    'n_estimators': [50, 100, 200],          # 만들 나무의 개수
    'max_depth': [None, 5, 10, 20],          # 나무의 최대 깊이
    'min_samples_split': [2, 5, 10]          # 노드를 분할하기 위한 최소 샘플 수
}

# 2. 기본 모델 선언
rfc_base = RandomForestClassifier(random_state=42)

# 3. GridSearchCV를 이용해 가장 성능 좋은 조합 탐색 (교차 검증 5폴드)
grid_search = GridSearchCV(
    estimator=rfc_base,
    param_grid=param_grid,
    cv=5,
    scoring='accuracy',
    n_jobs=-1
)

# 4. 학습 데이터로 최적의 조합 탐색 시작
grid_search.fit(X_train_scaled, y_train)

# 5. 결과 확인
print("최적의 하이퍼파라미터:", grid_search.best_params_)
print(f"최적 교차 검증 정확도: {grid_search.best_score_:.4f}")

# 6. 가장 성능이 좋은 최적의 모델을 변수에 담기
best_rfc = grid_search.best_estimator_

import joblib

# 1. 학습된 최적의 모델과 스케일러를 파일로 저장 (말자하 궁극기 봉인)
joblib.dump(best_rfc, 'best_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
print("모델과 스케일러가 성공적으로 저장되었습니다!")

# 2. 나중에 다시 불러와서 사용할 때 (말자하 궁극기 해제)
loaded_model = joblib.load('best_model.pkl')
loaded_scaler = joblib.load('scaler.pkl')
print("저장된 모델과 스케일러를 불러왔습니다!")

import pandas as pd

def make_inference_pipeline(new_data, scaler, model):
    # 1. 새로운 데이터가 DataFrame 형태인지 확인 후 전처리 적용
    # (학습 때 사용했던 scaler의 평균/분산 기준을 그대로 적용해야 하므로 transform만 사용)
    new_data_scaled = scaler.transform(new_data)

    # 2. 최적의 모델을 이용해 예측 수행
    predictions = model.predict(new_data_scaled)

    # 3. 예측 확률(확신도)도 함께 확인하고 싶을 때
    probabilities = model.predict_proba(new_data_scaled)

    # 결과 보기 쉽게 데이터프레임으로 묶기
    result_df = new_data.copy()
    result_df['Predicted_Label'] = predictions
    result_df['Prediction_Probability'] = [max(prob) for prob in probabilities]

    return result_df

# 사용 예시 (테스트 셋이나 새로운 입력 데이터를 넣고 실행)
# new_sample = X_test.iloc[:5]  # 테스트 셋 중 앞의 5개를 새로운 데이터라고 가정
# inference_result = make_inference_pipeline(new_sample, scaler, best_rfc)
# print(inference_result)


import pandas as pd
import numpy as np
import joblib

# 1. 저장된 모델과 스케일러 불러오기 (혹은 이미 메모리에 있다면 그대로 사용)
loaded_model = joblib.load('best_model.pkl')
loaded_scaler = joblib.load('scaler.pkl')

# 2. 기존 학습 데이터(X)의 컬럼 구조를 그대로 가져와서 임의의 데이터 3개 생성
# (실제 서비스 환경에서는 새로운 입력 값을 이 구조에 맞춰서 딕셔너리로 넣어주면 됩니다)
np.random.seed(42)
dummy_data = pd.DataFrame(
    np.random.randn(3, len(X.columns)), 
    columns=X.columns
)

print("--- 생성된 임의의 입력 데이터 ---")
print(dummy_data)

# 3. 추론 파이프라인 적용 (스케일링 -> 예측)
dummy_scaled = loaded_scaler.transform(dummy_data)
predictions = loaded_model.predict(dummy_scaled)
probabilities = loaded_model.predict_proba(dummy_scaled)

# 4. 결과 정리 및 출력 (말자하 궁극기 확정 킬)
result_df = dummy_data.copy()
result_df['Predicted_Label'] = predictions
result_df['Max_Probability'] = [max(prob) for prob in probabilities]

print("\n--- 최종 추론 결과 ---")
print(result_df)



import streamlit as st
import pandas as pd
import joblib

# 1. 모델과 스케일러 로드
model = joblib.load('best_model.pkl')
scaler = joblib.load('scaler.pkl')

st.title("🤖 머신러닝 예측 서비스")
st.write("값을 입력하면 모델이 결과를 실시간으로 예측해 드립니다!")

# 2. 필요한 입력 UI 구성 및 예측 로직만 깔끔하게 유지
# (이전에 작성한 입력창 및 버튼 코드가 여기에 위치)