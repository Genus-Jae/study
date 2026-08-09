import mysql.connector

connection = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",
    database="python_test"
)

if connection.is_connected():
    print("mysql에 성공적으로 연결되었습니다.")

connection.close()
