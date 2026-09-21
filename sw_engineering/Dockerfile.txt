# 사용할 기본 환경 : Python 3.12의 가벼운 slim 이미지를 기본 이미지로 사용
FROM python:3.12-slim

# 작업 디렉터리 설정 : 컨테이너 내부 작업 디렉터리를 /app으로 설정
WORKDIR /app

# requirements.txt 파일을 컨테이너로 복사
COPY requirements.txt .

# 라이브러리 설치 : requirements.txt에 작성된 Python 패키지 설치
# --no-cache-dir: pip 캐시를 남기지 않아 이미지 용량을 줄임
RUN pip install --no-cache-dir -r requirements.txt

# 파일 복사 : 현재 프로젝트의 전체 파일을 /app으로 복사
COPY . .

# 컨테이너가 8000번 포트를 사용하는 것을 명시
EXPOSE 8000

# Container 실행 시 수행할 명령 : 컨테이너 실행 시 Uvicorn으로 FastAPI 서버 시작
CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]