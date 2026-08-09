import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()
db_password = os.getenv("DB_PASSWORD")

with mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = db_password,
    database = "python_test"
)as connection:

    with connection.cursor() as cursor:
        sql = "delete from users where name = %s"
        values = ("Encore",)   

        cursor.execute(sql, values)
        connection.commit()

        print(f"{cursor.rowcount}개의 행이 삭제되었습니다.")