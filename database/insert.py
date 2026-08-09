import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",
    database="python_test"
)

cursor = connection.cursor()

sql = "insert into users (name, email) values (%s, %s)"
values = ("Encore","encore@example.com")

cursor.execute(sql, values) #쿼리 실행
connection.commit() #변경 사항 커밋(저장)

print(f"{cursor.rowcount}개의 행이 삽입되었습니다.")

cursor.close()
connection.close()