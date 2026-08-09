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
    with connection.cursor() as cursor:

        
        sql = "update users set email = %s where name = %s"
        values = ("new_encore@example.com", "Encore")

        cursor.execute(sql, values) #쿼리 실행
        connection.commit() #변경 사항 커밋(저장)

        print(f"{cursor.rowcount}개의 행이 수정되었습니다.")

