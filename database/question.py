import mysql.connector
import os
import streamlit as st
from dotenv import load_dotenv

load_dotenv() #env파일 읽기
db_password = os.getenv("DB_PASSWORD")
#print(db_password)

with mysql.connector.connect(
    host="localhost",
    user="root",
    password= db_password,
    database="menudb"
) as connection:
    
    #데이터베이스 작업 커서
    with connection.cursor(dictionary=True) as cursor:

        cursor.execute("select * from tbl_menu")

        rows = cursor.fetchall()#조회 결과를 모두 가져옴
    
        

        #print(f"{cursor.rowcount}개의 행이 조회되었습니다.")
        
st.title("메뉴 조회판")
st.dataframe(rows)
st.write(f"총 메뉴 수 : {len(rows)}")