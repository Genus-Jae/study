import streamlit as st

# 1. 데이터 설정
faq_data = [
    {"q": f"질문 {i+1}", "a": f"질문 {i+1}에 대한 답변입니다."} for i in range(30)
]

# 2. 페이지네이션 설정
items_per_page = 5
total_pages = (len(faq_data) + items_per_page - 1) // items_per_page

# 세션 스테이트 초기화 (현재 페이지)
if 'page' not in st.session_state:
    st.session_state.page = 1

# 3. 페이지 데이터 슬라이싱
start_idx = (st.session_state.page - 1) * items_per_page
end_idx = start_idx + items_per_page
current_faqs = faq_data[start_idx:end_idx]

# 4. 화면 출력 
st.title("⛽FAQ 페이지")

for item in current_faqs:
    with st.expander(item["q"]):
        st.write(item["a"])

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