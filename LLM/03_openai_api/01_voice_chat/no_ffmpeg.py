import streamlit as st
from audiorecorder import audiorecorder

from openai_service import ask_gpt, stt, tts


def main():
    st.set_page_config(
        page_title="음성 채팅 봇",
        page_icon="🎙️",
        layout="wide",
    )
    st.header("음성 채팅 봇")
    st.markdown("---")

    with st.expander("음성 채팅 봇 사용 설명서", expanded=False):
        st.write(
            """
            1. 음성 파일을 업로드하거나 텍스트로 질문을 입력합니다.
            2. 업로드된 음성은 Whisper 모델을 이용해 텍스트로 변환합니다.
            3. 변환된 텍스트로 LLM에 질문하고 답변을 받습니다.
            4. LLM의 답변을 TTS 모델로 음성으로 변환해 재생합니다.
            5. 질문과 답변은 채팅 형식의 텍스트로도 표시됩니다.
            """
        )

    system_prompt = (
        "당신은 친절한 챗봇입니다. "
        "사용자의 질문에 50단어 이내로 간결하게 답변해 주세요."
    )

    if "messages" not in st.session_state:
        st.session_state["messages"] = [
            {
                "role": "system",
                "content": system_prompt,
            }
        ]

    if "check_reset" not in st.session_state:
        st.session_state["check_reset"] = False

    with st.sidebar:
        model = st.radio(
            label="GPT 모델",
            options=["gpt-5.6-luna", "gpt-5-nano"],
            index=0,
        )

        if st.button(label="초기화"):
            st.session_state["messages"] = [
                {
                    "role": "system",
                    "content": system_prompt,
                }
            ]
            st.session_state["check_reset"] = True

    col1, col2 = st.columns(2)

    with col1:
        st.subheader("입력하기")

        st.markdown("### 음성 파일 업로드")
        uploaded = st.file_uploader(
            "wav/mp3/m4a 파일을 올려주세요",
            type=["wav", "mp3", "m4a"],
            accept_multiple_files=False,
        )

        st.markdown("### 텍스트로 입력")
        typed_text = st.text_input(
            "질문을 입력하세요",
            value="",
            placeholder="예시: 오늘 점심은 뭐 먹지?",
        )

        can_run = (
            uploaded is not None
            or typed_text.strip() != ""
        )

        run_clicked = st.button(
            "질문 보내기",
            disabled=not can_run,
        )

        if st.session_state["check_reset"]:
            st.session_state["check_reset"] = False

        if run_clicked:
            if uploaded is not None:
                st.audio(uploaded.getvalue())
                query = stt(uploaded)
            else:
                query = typed_text.strip()

            if not query:
                st.warning("질문이 비어 있습니다!")
                return

            st.session_state["messages"].append(
                {
                    "role": "user",
                    "content": query,
                }
            )

            response: str = ask_gpt(
                st.session_state["messages"],
                model,
            )

            st.session_state["messages"].append(
                {
                    "role": "assistant",
                    "content": response,
                }
            )

            base64_encoded_audio: str = tts(response)

            st.html(
                f"""
                <audio autoplay="true">
                    <source
                        src="data:audio/mp3;base64,{base64_encoded_audio}"
                        type="audio/mpeg"
                    >
                </audio>
                """
            )

    with col2:
        st.subheader("질문/답변")

        for message in st.session_state["messages"]:
            role = message["role"]
            content = message["content"]

            if role == "system":
                continue

            with st.chat_message(role):
                st.markdown(content)


if __name__ == "__main__":
    main()
