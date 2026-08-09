import streamlit as st
import pandas as pd
import os

# 1. 데이터 로드 (절대 경로 사용)
EXCEL_PATH = r'C:\Users\SJ\web_crawling\03_dynamic_web_crawling\faq_data.xlsx'

@st.cache_data
def load_data():
    return pd.read_excel(EXCEL_PATH)

@st.cache_data
def load_data():
    df = pd.read_excel(EXCEL_PATH)

    for col in df.select_dtypes(include="object"):
        df[col] = (
            df[col]
            .astype(str)
            .str.replace(r"\s*~\s*", " ~ ", regex=True)
        )

    return df

# 데이터프레임을 리스트(딕셔너리) 형태로 변환
faq_data = load_data().to_dict('records')

# 2. 페이지네이션 설정
items_per_page = 5
total_pages = (len(faq_data) + items_per_page - 1) // items_per_page

if 'page' not in st.session_state:
    st.session_state.page = 1

# 3. 데이터 슬라이싱
start_idx = (st.session_state.page - 1) * items_per_page
end_idx = start_idx + items_per_page
current_faqs = faq_data[start_idx:end_idx]

# 4. 화면 출력
st.title("⛽ FAQ 페이지")
st.write(f"총 {len(faq_data)}개의 문의사항이 있습니다.")

for item in current_faqs:
    # 엑셀의 '제목', '내용' 컬럼명에 맞춰 사용하세요
    with st.expander(f"📌 {item['제목']}"):
        st.write(item['내용'])
        
        # 파일 다운로드 로직 (downloads 폴더 내 파일 확인)
        file_path = os.path.join(r'C:\Users\SJ\web_crawling\03_dynamic_web_crawling\downloads', f"{item['제목']}.pdf")
        
        if os.path.exists(file_path):
            with open(file_path, "rb") as f:
                st.download_button(
                    label="📥 첨부파일 다운로드",
                    data=f,
                    file_name=f"{item['제목']}.pdf",
                    mime="application/pdf"
                )
        else:
            st.caption("첨부파일이 없습니다.")

# 5. 페이지 이동 버튼
col1, col2, col3 = st.columns([1, 2, 1])
with col1:
    if st.button("이전"):
        if st.session_state.page > 1:
            st.session_state.page -= 1
            st.rerun()
with col3:
    if st.button("다음"):
        if st.session_state.page < total_pages:
            st.session_state.page += 1
            st.rerun()

st.write(f"페이지 {st.session_state.page} / {total_pages}")


