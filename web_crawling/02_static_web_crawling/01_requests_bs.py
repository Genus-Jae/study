# 정적 페이지 웹 스크래핑 -> requests, beautifulsoup
# 정적 페이지 = 요청한 url에서 응답받은 html을 그대로 사용한 경우 (Server Side Rendering)

# https://tedboy.github.io/bs4_doc/generated/generated/bs4.BeautifulSoup.html
import requests
from bs4 import BeautifulSoup

# web request 요청 함수
def web_request(url):
    response = requests.get(url)   # URL에 GET 요청
    print(response)                # <Response [200]> → 응답 객체
    print(response.status_code)    # 상태 코드 (200이면 정상)
    print(response.text)           # 실제 HTML 텍스트
    return response

# url = "https://naver.com"
# response = web_request(url)

# 로컬 파일(html_sample.html) 읽어서 파싱
with open('html_sample.html', 'r', encoding='utf-8') as f:
    html = f.read()

# BeautifulSoup 객체 생성 (HTML 파싱)
bs = BeautifulSoup(html, 'html.parser') # HTML을 파싱하여 Python 객체로 변환
# print(bs)
# print(type(bs))

# find(), find_all() 테스트
def test_find():
    # find(): html 태그 및 속성을 dict로 조회 (1개만 조회)
    tag = bs.find('li')
    print(tag)                      # <li> ... </li>
    print(type(tag))                # Tag 객체

    # find_all(): 조건과 일치하는 '모든 태그 리스트' 반환
    tags = bs.find_all('section', {'id': 'section1'})
    print(tags)           # [<section id="section1">...</section>]
    print(type(tags))     # ResultSet (리스트와 비슷함)

# CSS 선택자 기반 select(), select_one()
def test_selector():
    # select_one(): CSS 선택자로 '첫 번째' 요소 반환
    tag = bs.select_one('section#section2')  # id="section2"인 section
    print(tag)
    print(type(tag))   # Tag

		# select(): 조건에 맞는 모든 요소 반환
    tags = bs.select('.section-content')  # class="section-content"
    print(tags)
    print(type(tags))  # ResultSet

# [힌트] ResultSet -> Tag -> text 속성(= 내용)

# section2 내부 li 태그들만 가져오기
def get_content1():
    tags = bs.select('section#section2 li')  # section2 내부의 모든 li

    for tag in tags:
        print(tag.text)    # text = 태그 안의 실제 문자열만

# section1의 h2 내용, p 태그들 내용 출력
def get_content2():
    h2_tag = bs.select_one('section#section1 > h2')  # section1 바로 아래 자식 h2
    print(h2_tag.text)

    p_tag = bs.select('section#section1 > p')  # 자식 p 태그 모두
    for tag in p_tag:
        print(tag.text)

# section1의 모든 자식 태그 조회 + 원하는 내용만 출력
def get_content3():
    section1_tag = bs.select_one('section#section1')  # section1 태그 전체

    children = section1_tag.findChildren()  # 모든 자식 태그 리스트
    print(children)  # 디버깅용 출력

    h2_tag = section1_tag.select_one('h2')  # section1 내부 h2
    p_tags = section1_tag.select('p')       # section1 내부 p 전부
    print(h2_tag.text)
    print([p_tag.text for p_tag in p_tags])   # 리스트 컴프리헨션로 내용만



# 함수 실행
# test_find()
# test_selector()
# get_content1()
# get_content2()
# get_content3()