import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv() #env파일 읽기
db_password = os.getenv("DB_PASSWORD")
#print(db_password)

with mysql.connector.connect(
    host="localhost",
    user="root",
    password= db_password,
    database="python_test"
) as connection:
    #데이터베이스 작업 커서 
    # with connection.cursor() as cursor:
    with connection.cursor(dictionary=True) as cursor: #리스트(딕셔너리형태)

        cursor.execute("select * from users") #쿼리 실행
        

        rows = cursor.fetchall()#조회 결과를 모두 가져옴
        for row in rows:
            print(row['email'])
       # print(rows)

        print(f"{cursor.rowcount}개의 행이 조회되었습니다.")


