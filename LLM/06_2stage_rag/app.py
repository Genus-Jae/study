import streamlit as st

from ai_wine_sommelier import ai_wine_sommelier_rag


st.set_page_config(
    page_title="AI Wine Sommelier",
    page_icon="🍷"
)

st.title("🍷 AI Wine Sommelier 🍷")
st.write("🍖 음식 이미지 URL을 입력하면 어울리는 와인을 추천해 드립니다.")


with st.form(key="img_form"):
    img_url = st.text_input(
        "이미지 URL 입력:",
        placeholder="예: https://example.com/food.jpg"
    )
    submit_button = st.form_submit_button(label="추천받기")


if submit_button:
    if img_url.strip():
        try:
            st.image(img_url)
            st.subheader("AI 와인 추천")

            with st.spinner("와인을 검색하고 있습니다..."):
                query = {
                    "text": "",
                    "image_urls": [img_url.strip()]
                }

                gen_response = ai_wine_sommelier_rag(query)
                st.write_stream(gen_response)

        except Exception as error:
            st.error(f"처리 중 오류가 발생했습니다: {error}")
    else:
        st.warning("이미지 URL을 입력해 주세요!")
